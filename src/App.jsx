import { Routes, Route, BrowserRouter } from "react-router-dom";
import { protectedRoutes, publicRoutes } from "./routes/routes";
import ProtectedRoute from "./routes/ProtectedRoutes";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {publicRoutes?.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))}

          <Route element={<ProtectedRoute />}>
            {protectedRoutes?.map((route, i) => (
              <Route key={i} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
