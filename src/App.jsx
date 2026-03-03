import { Routes, Route, BrowserRouter } from "react-router-dom";
import { authRoutes, protectedRoutes, publicRoutes } from "./routes/routes";
import ProtectedRoute from "./routes/ProtectedRoutes";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import ScrollToTop from "./hooks/scrollToTop";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFoundPage";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function App() {

  const { i18n } = useTranslation();

  useEffect(() => {
    document.body.classList.remove("lang-en", "lang-gj");
    document.body.classList.add(
      i18n.language === "gj" ? "lang-gj" : "lang-en"
    );
  }, [i18n.language]);


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
