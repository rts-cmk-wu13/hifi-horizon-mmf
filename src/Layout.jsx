import { Outlet } from "react-router";
import Footer from "./components/Footer";
import "./App.css";

function Layout() {
  return (
    <>
      <header></header>

      <main>
        <Outlet />
      </main>

      <footer className="">
        <Footer />
      </footer>
    </>
  );
}

export default Layout;
