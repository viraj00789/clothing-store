import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";

export default function MainLayout() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <main className="p-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
