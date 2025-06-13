import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header.jsx";
import Spinner from "./components/load.jsx";
import "./app.css";

const AboutUs = lazy(() =>
  new Promise(resolve => setTimeout(() => resolve(import("./components/aboutus.jsx")), 1500))
);
const Contact = lazy(() =>
  new Promise(resolve => setTimeout(() => resolve(import("./components/contact.jsx")), 1500))
);

const style = {
  app: {
    width: "1200px",
    placeSelf: "center",
  },
};

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Simulate loading time for demo, or remove setTimeout for real lazy loading
    const timeout = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div style={style.app}>
      <Header />
      {loading && <Spinner />}
      <div className={`app-content${loading ? " loading" : ""}`}>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            {/* Add more routes as needed */}
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}