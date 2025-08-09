import { Link } from "react-router-dom";

const BG =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop";

export default function Register() {
  return (
    <div className="grid md:grid-cols-2 min-h-[680px]">
      <div
        className="relative hidden md:block"
        style={{ backgroundImage: `url(${BG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute top-10 left-6 right-6 text-white">
          <h2 className="font-serif h-section">JOIN OUR COMMUNITY</h2>
          <p className="mt-10 font-serif text-3xl max-w-2xl">
            Start planning your Sri Lankan Adventure
          </p>
          <ul className="mt-10 space-y-5 text-lg list-disc list-inside max-w-xl">
            <li>Personalized travel recommendation</li>
            <li>Exclusive travel deals</li>
            <li>Connect with local guides</li>
          </ul>
        </div>
      </div>

      <div className="bg-black text-white flex items-center justify-center py-16">
        <div className="w-full max-w-xl px-8">
          <h2 className="text-5xl font-serif font-bold">Create Account</h2>
          <p className="mt-2 text-xl">Begin your journey with us</p>

          <form className="mt-10 space-y-6">
            <div>
              <label className="block mb-2">Full Name</label>
              <input className="input !bg-gray-800 !border-gray-700 text-white" placeholder="John Doe" />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input className="input !bg-gray-800 !border-gray-700 text-white" type="email" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block mb-2">Password</label>
              <input className="input !bg-gray-800 !border-gray-700 text-white" type="password" placeholder="••••••••" />
            </div>
            <div>
              <label className="block mb-2">Confirm Password</label>
              <input className="input !bg-gray-800 !border-gray-700 text-white" type="password" placeholder="••••••••" />
            </div>

            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5" />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>

            <button type="submit" className="btn-ghost w-full !bg-gray-200 !text-black !border-0">
              Create Account
            </button>

            <p className="text-center">
              Already have an account? <Link to="/login" className="underline">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
