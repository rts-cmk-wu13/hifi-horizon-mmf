import { Outlet, useNavigation } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import Spinner from "./components/load";
import "./App.css"; 


export default function Layout() {
  const navigation = useNavigation();

  return (
    <>
      <Header />
      <main>
        {navigation.state === "loading" && <Spinner />}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
