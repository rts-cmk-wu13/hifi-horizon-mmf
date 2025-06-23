import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./App.css";
/* import Spinner from "./Pages/Load"; */
import Chatbot from "./components/Chatbot";

function Layout() {
  return (
    <>
      <Chatbot />
      <Header />

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
