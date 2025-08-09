// src/pages/PortCityDetails.jsx
import { useCart } from "../store/CartContext.jsx";
import PORTCITY_IMAGE from "../assets/portcity.jpg"; // place your image in src/assets/

const HERO = PORTCITY_IMAGE;

export default function PortCityDetails() {
  const { add } = useCart();
  const card = {
    id: "port-city",
    title: "Port City Colombo",
    distance: "2km",
    fee: "Rs.1500"
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative h-[380px]"
        style={{
          backgroundImage: `url(${HERO})`,
          backgroundSize: "cover",
          backgroundPosition: "top"
        }}
      >
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative z-10 container-xxl h-full flex flex-col justify-end pb-10 text-white">
          <h1 className="h-hero">Port City Colombo</h1>
          <p className="text-lg">Colombo, Sri Lanka</p>
        </div>
      </section>

      {/* Info grid */}
      <section className="container-xxl mt-6">
        <div className="grid lg:grid-cols-5 gap-5">
          <div className="lg:col-span-1 card p-6 bg-[#cfeaff]">
            <h3 className="font-serif text-2xl font-bold mb-3">About Port City</h3>
            <p className="text-sm">
              Port City Colombo is a modern seafront development featuring promenades,
              recreational spaces, and striking skyline views. It’s a popular spot for
              evening walks, cycling, and waterfront dining.
            </p>
          </div>

          <div className="lg:col-span-1 card p-6 bg-[#cfeaff]">
            <h3 className="font-serif text-2xl font-bold mb-3">Quick info</h3>
            <ul className="text-sm space-y-3">
              <li>📍 Colombo, Sri Lanka</li>
              <li>⭐ 4.6 (1,280 reviews)</li>
              <li>🕖 Open 24/7 public spaces; best at sunset</li>
            </ul>
          </div>

          <div className="lg:col-span-1 card p-6 bg-[#cfeaff]">
            <h3 className="font-serif text-2xl font-bold mb-3">Travel Tips</h3>
            <ul className="text-sm space-y-3 list-disc list-inside">
              <li>Great for sunset photos—bring a light jacket for sea breeze</li>
              <li>Plenty of walking/cycling paths—wear comfy shoes</li>
              <li>Check for events or pop-up markets on weekends</li>
              <li>Carry water; shade can be limited at noon</li>
            </ul>
          </div>

          <div className="lg:col-span-1 card p-6 bg-[#cfeaff]">
            <h3 className="font-serif text-2xl font-bold mb-3">Emergency Contacts</h3>
            <ul className="text-sm space-y-3">
              <li>👮 Police — 119 / 112</li>
              <li>🚑 Ambulance — 1990</li>
              <li>🏥 Colombo General Hospital — 0112 691111</li>
            </ul>
          </div>

          <div className="lg:col-span-1 card p-6 bg-[#cfeaff]">
            <h3 className="font-serif text-2xl font-bold mb-3">
              Distance : {card.distance}
            </h3>
            <p className="text-sm">Transport fee: {card.fee}</p>
            <div className="mt-6 flex flex-col gap-3">
              <button onClick={() => add(card)} className="btn-dark">
                Add cart
              </button>
              {/* Use your taxi button style; if you created .btn-taxi it will apply, else replace with btn-ghost or custom classes */}
              <button className="btn-taxi">Book Taxi</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
