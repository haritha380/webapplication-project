import { useUser } from "../store/UserContext";
import { useEffect, useRef, useState } from "react";

const DEFAULT_PROFILE =
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=600&auto=format&fit=crop";
const BG =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop";

export default function Profile() {
  const { user, updateUser } = useUser();
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("Colombo, Sri Lanka");
  const [language, setLanguage] = useState("English");
  const [photo, setPhoto] = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setAge(user.age || "");
      setEmail(user.email || "");
      setLocation(user.location || "Colombo, Sri Lanka");
      setLanguage(user.language || "English");
      setPhoto(user.photo || "");
    }
  }, [user]);

  const handleSave = (e) => {
    e.preventDefault();
    if (age && Number(age) < 18) {
      alert("Age must be 18 or older.");
      return;
    }
    updateUser({ fullName, age, email, location, language, photo });
    alert("Profile updated!");
  };

  const onPickPhoto = () => fileRef.current?.click();

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result?.toString() || "";
      setPhoto(dataUrl);
      updateUser({ photo: dataUrl });
    };
    reader.readAsDataURL(f);
  };

  const profileSrc = photo || DEFAULT_PROFILE;

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
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto ring-2 ring-white/30">
                <img src={profileSrc} className="w-full h-full object-cover" alt="profile" />
              </div>
              <input
                ref={fileRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onFileChange}
              />
              <button onClick={onPickPhoto} className="btn-ghost w-full mt-4 !bg-white/10 !text-white">
                Change Photo
              </button>
              <p className="text-xs text-center mt-2">Recommended size: 400×400px</p>
            </div>
          </div>

          {/* Right */}
          <form onSubmit={handleSave} className="lg:col-span-2 space-y-8">
            <div className="bg-black/70 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
              <div className="grid gap-4">
                <div>
                  <label className="block mb-1">Full Name</label>
                  <input
                    className="input !bg-white/10 !border-white/10 text-white"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Age</label>
                  <input
                    className="input !bg-white/10 !border-white/10 text-white"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <p className="text-xs mt-1 opacity-70">Must be 18 or older</p>
                </div>
                <div>
                  <label className="block mb-1">Email Address</label>
                  <input
                    className="input !bg-white/10 !border-white/10 text-white"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                  />
                  <p className="text-xs mt-1 opacity-70">Used for account recovery</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/70 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-3">Travel Preferences</h3>
                <input
                  className="input !bg-white/10 !border-white/10 text-white"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, Country"
                />
              </div>
              <div className="bg-black/70 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-3">Language</h3>
                <input
                  className="input !bg-white/10 !border-white/10 text-white"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  placeholder="e.g., English"
                />
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
                <div className="flex items-center gap-3">
                  <button type="submit" className="btn-primary">Update</button>
                  <button type="button" className="btn-ghost !bg-white/10 !text-white">Delete</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
