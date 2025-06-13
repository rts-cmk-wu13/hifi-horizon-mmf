import { Outlet } from "react-router";
import Footer from "./components/Footer";
import "./App.css";
import Header from "./components/header";

function Layout() {
  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="">{/*   <Footer /> */}</footer>
    </>
  );
}

export default Layout;
