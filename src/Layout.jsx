import { Outlet, useNavigation } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import Spinner from "./components/load";
import "./App.css";
/* import Spinner from "./Pages/Load"; */
import Chatbot from "./components/Chatbot";

export default function Layout() {
  const navigation = useNavigation();

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
