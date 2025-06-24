import { Outlet, useNavigation } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import Spinner from "./components/load";
import Chatbot from "./components/Chatbot";
import "./App.css";


export default function Layout() {
  const navigation = useNavigation();

  return (
    <div className="layout-container">
      {/* Chatbot */}
      <Chatbot />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="main-content">
        {/* Show spinner while navigating */}
        {navigation.state === "loading" && <Spinner />}
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}
