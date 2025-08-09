import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import District from "./pages/District.jsx";
import PlaceDetails from "./pages/PlaceDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Profile from "./pages/Profile.jsx";
import Colombo from "./pages/Colombo.jsx";
import Districts from "./pages/Districts.jsx";
import PortCityDetails from "./pages/PortCityDetails.jsx";
export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* districts */}
          <Route path="/districts/kandy" element={<District />} />

          {/* places */}
          <Route path="/places/temple-of-the-tooth" element={<PlaceDetails />} />

          {/* misc */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="*" element={<Navigate to="/" replace />} />

          <Route path="/districts/colombo" element={<Colombo />} />
           <Route path="/districts" element={<Districts />} />
           <Route path="/places/colombo/port-city" element={<PortCityDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
