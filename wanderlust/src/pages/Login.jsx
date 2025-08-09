import { Link } from "react-router-dom";
import FALL_IMAGE from "../assets/fall.jpg";
const BG =
  FALL_IMAGE;

export default function Login() {
  return (
    <div className="grid md:grid-cols-2 min-h-[640px]">
      <div
        className="relative hidden md:block"
        style={{ backgroundImage: `url(${BG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute top-12 left-10 right-10 text-white">
          <h1 className="font-serif font-black text-5xl leading-tight">
            Discover Sri Lanka
          </h1>
          <h3 className="mt-5 text-3xl">Your gateway to paradise island adventures</h3>
          <p className="mt-6 text-lg">
            Explore ancient temples, pristine beaches, and lush landscapes
          </p>
        </div>
      </div>

      <div className="bg-[#f5eef5] flex items-center justify-center py-16">
        <div className="w-full max-w-xl px-8">
          <h2 className="text-4xl font-serif font-bold text-center">Welcome Back!</h2>
          <p className="text-center text-lg mt-3">Log in to continue your journey</p>

          <form className="mt-10 space-y-6">
            <div>
              <label className="block font-medium mb-2">Email</label>
              <input className="input" type="email" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block font-medium mb-2">Password</label>
              <input className="input" type="password" placeholder="••••••••" />
            </div>

            <div className="text-right">
              <button type="button" className="text-blue-700 underline">Forgot Password?</button>
            </div>

            <button type="submit" className="btn-primary w-full">Login</button>

            <p className="text-center">
              Don't have an account? <Link className="text-blue-700 underline" to="/register">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
