import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { Suspense, lazy, useState } from "react";
import Footer from "../components/Footer";
import ProfileTabs from "./Pages/ProfileTabs";
import Spinner from "./components/load";
import Header from "./components/header";

// Lazy load all pages
const Login = lazy(() => import("./Pages/login"));
const MyProfile = lazy(() => import("./Pages/myprofile"));
const OpretProfil = lazy(() => import("./Pages/opretprofil"));
const Logout = lazy(() => import("./Pages/logout"));
const ChangePasswordPage = lazy(() => import("./components/Modify"));
const Orders = lazy(() => import("./Pages/orders"));

function AppContent() {
  const location = useLocation();

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/myprofile"
            element={
              <ProfileTabs>
                <MyProfile />
              </ProfileTabs>
            }
          />
          <Route
            path="/orders"
            element={
              <ProfileTabs>
                <Orders />
              </ProfileTabs>
            }
          />
          <Route path="/opretprofil" element={<OpretProfil />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="*" element={<div>404 Page not found</div>} />
        </Routes>
      </Suspense>
      {/* Show Footer conditionally */}
      {location.pathname !== "/myprofile" && location.pathname !== "/orders" && <Footer />}
    </>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  // After successful login, setUser({ fullname: "Your Name" });

  return (
    <BrowserRouter>
      <Header user={user} />
      <AppContent />
    </BrowserRouter>
  );
}