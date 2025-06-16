import { Outlet } from "react-router";
import Footer from "./components/Footer";
import "./App.css";
import Header from "./components/header";
import Spinner from "./Pages/Load";

function Layout() {
  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        <Outlet />
        {/*  <Spinner /> */}
      </main>

      <footer className="">
        {" "}
        <Footer />
      </footer>
    </>
  );
}

export default Layout;
