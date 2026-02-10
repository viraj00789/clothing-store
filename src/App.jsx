import { Routes, Route, BrowserRouter } from "react-router-dom";
import { authRoutes, protectedRoutes, publicRoutes } from "./routes/routes";
import ProtectedRoute from "./routes/ProtectedRoutes";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import ScrollToTop from "./hooks/scrollToTop";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<AuthLayout />}>
            {authRoutes.map((route, i) => (
              <Route key={i} path={route.path} element={route.element} />
            ))}
          </Route>
          <Route path="/" element={<MainLayout />}>
            {publicRoutes.map((route, i) => (
              <Route key={i} path={route.path} element={route.element} />
            ))}

            <Route element={<ProtectedRoute />}>
              {protectedRoutes.map((route, i) => (
                <Route key={i} path={route.path} element={route.element} />
              ))}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
