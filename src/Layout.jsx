import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Header from './components/Header';
import "./App.css";

function Layout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <footer className="">{/*   <Footer /> */}</footer>
    </>
  );
}

export default Layout;
