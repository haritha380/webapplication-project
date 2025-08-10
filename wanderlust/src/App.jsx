import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import District from "./pages/District.jsx";                // Kandy district page
import Colombo from "./pages/Colombo.jsx";
import Districts from "./pages/Districts.jsx";
import PlaceDetails from "./pages/PlaceDetails.jsx";        // Temple of the Tooth
import PortCityDetails from "./pages/PortCityDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Profile from "./pages/Profile.jsx";

// Auth
import { AuthProvider } from "./store/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// User profile store
import { UserProvider } from "./store/UserContext.jsx";

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        
          {/* Public routes (no navbar/footer to keep login/register clean) */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected app shell: navbar + footer + all private pages */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen flex flex-col bg-white">
                    <Navbar />
                    <main className="flex-1">
                      <Routes>
                        {/* Home */}
                        <Route path="/" element={<Home />} />

                        {/* District selector + district pages */}
                        <Route path="/districts" element={<Districts />} />
                        <Route path="/districts/kandy" element={<District />} />
                        <Route path="/districts/colombo" element={<Colombo />} />

                        {/* Place details */}
                        <Route path="/places/temple-of-the-tooth" element={<PlaceDetails />} />
                        <Route path="/places/colombo/port-city" element={<PortCityDetails />} />

                        {/* Misc */}
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/profile" element={<Profile />} />

                        {/* Catch-all inside protected area -> Home */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </main>
                    <Footer />
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Catch-all for anything else -> login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        
      </UserProvider>
    </AuthProvider>
  );
}
