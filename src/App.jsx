import { Routes, Route, BrowserRouter } from "react-router-dom";
import { authRoutes, protectedRoutes, publicRoutes } from "./routes/routes";
import ProtectedRoute from "./routes/ProtectedRoutes";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import ScrollToTop from "./hooks/scrollToTop";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
