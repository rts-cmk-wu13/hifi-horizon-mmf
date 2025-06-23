import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyProfile from "./Pages/myprofile";
import Orders from "./Pages/orders";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/orders" element={<Orders />} />
        {/* ...other routes... */}
      </Routes>
    </Router>
  );
}

export default App;