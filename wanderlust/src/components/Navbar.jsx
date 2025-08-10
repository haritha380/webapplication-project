import { Link, NavLink, useNavigate } from "react-router-dom";
import { Compass, MapPin, User2, ShoppingCart, LogOut } from "lucide-react";
import { useUser } from "../store/UserContext";
import { useAuth } from "../store/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const active = "text-gray-900 font-medium";
  const base = "text-gray-600 hover:text-gray-900";

  const { user, clearUser } = useUser();
  const { logout } = useAuth?.() || { logout: () => {} };

  const onLogout = () => {
    try { logout?.(); } catch {}
    try { clearUser(); } catch {}
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="container-xxl h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-600 grid place-content-center text-white">
            <Compass size={18} />
          </div>
          <span className="font-semibold tracking-wide">
            {user?.fullName ? `Wanderlust — ${user.fullName}` : "Wanderlust"}
          </span>
        </Link>

        <div className="hidden md:flex flex-1 max-w-xl">
          <input
            className="w-full rounded-full bg-gray-100 px-4 py-2 outline-none border border-transparent focus:border-brand-400"
            placeholder="Search destinations, activities, or guides…"
          />
        </div>

        <nav className="flex items-center gap-5">
          <NavLink to="/districts" className={({isActive})=>isActive?active:base}>
            <span className="inline-flex items-center gap-2">
              <MapPin size={18}/> Select District
            </span>
          </NavLink>
          <NavLink to="/profile" className={({isActive})=>isActive?active:base}>
            <span className="inline-flex items-center gap-2">
              <User2 size={18}/> Profile
            </span>
          </NavLink>
          <NavLink to="/cart" className={({isActive})=>isActive?active:base}>
            <span className="inline-flex items-center gap-2">
              <ShoppingCart size={18}/> Cart
            </span>
          </NavLink>
          <button onClick={onLogout} className="text-gray-600 hover:text-gray-900 inline-flex items-center gap-2">
            <LogOut size={18}/> Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
