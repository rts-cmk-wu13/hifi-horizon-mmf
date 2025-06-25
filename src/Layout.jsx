import { Outlet, useNavigation } from "react-router";
import Footer from "./components/Footer";
import Spinner from "./components/Load";
import Header from "./components/header";
import "./App.css";
/* import Spinner from "./Pages/Load"; */
import Chatbot from "./components/Chatbot";

function Layout() {
  return (
    <>
      <Chatbot />
      <Header />

      <main>
      {navigation.state === "loading" && <Spinner />}
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
