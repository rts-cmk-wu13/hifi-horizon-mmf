import { Outlet } from "react-router";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <header>
        <h1>my App</h1>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
