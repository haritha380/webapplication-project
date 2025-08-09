const PROFILE =
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=600&auto=format&fit=crop";
const BG =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop";

export default function Profile() {
  return (
    <>
      <section className="relative h-28 bg-[#1f1a17] text-white flex items-center justify-center">
        <div className="container-xxl text-center">
          <h1 className="h-hero text-4xl">Profile</h1>
        </div>
      </section>

      <section
        className="relative"
        style={{ backgroundImage: `url(${BG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative container-xxl py-10 grid lg:grid-cols-3 gap-10 text-gray-100">
          {/* Left */}
          <div className="lg:col-span-1">
            <div className="bg-black/70 rounded-2xl p-6">
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto">
                <img src={PROFILE} className="w-full h-full object-cover" alt="profile" />
              </div>
              <button className="btn-ghost w-full mt-4 !bg-white/10 !text-white">Change Photo</button>
              <p className="text-xs text-center mt-2">Recommended size: 400×400px</p>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-black/70 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
              <div className="grid gap-4">
                <div>
                  <label className="block mb-1">Full Name</label>
                  <input className="input !bg-white/10 !border-white/10 text-white" placeholder="Enter your full name" />
                </div>
                <div>
                  <label className="block mb-1">Age</label>
                  <input className="input !bg-white/10 !border-white/10 text-white" placeholder="Enter your age" />
                  <p className="text-xs mt-1 opacity-70">Must be 18 or older</p>
                </div>
                <div>
                  <label className="block mb-1">Email Address</label>
                  <input className="input !bg-white/10 !border-white/10 text-white" placeholder="Enter your email" />
                  <p className="text-xs mt-1 opacity-70">Used for account recovery</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/70 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-3">Travel Preferences</h3>
                <div className="badge">Location &nbsp; New York, USA</div>
              </div>
              <div className="bg-black/70 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-3">Language</h3>
                <div className="badge">English</div>
              </div>
            </div>

            <div className="bg-black/70 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-3">Privacy Settings</h3>
              <label className="inline-flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
                <span>Private Profile</span>
              </label>
            </div>

            <div className="bg-black/70 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-red-400 font-semibold">Delete Account</div>
                  <div className="text-xs opacity-70">Permanently delete your account</div>
                </div>
                <button className="btn-ghost !bg-white/10 !text-white">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
