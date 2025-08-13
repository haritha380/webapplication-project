import { useCart } from "../store/CartContext.jsx";
import KAN1_IMAGE from "../assets/kandy1.webp";
import TOOTH_IMAGE from "../assets/tooth.jpg";
import PERA_IMAGE from "../assets/pera.webp";
import BAHIR_IMAGE from "../assets/bahirawa.jpg";

import {Link} from 'react-router-dom'

const HERO =
KAN1_IMAGE
const T1 =
  TOOTH_IMAGE;
const T2 =
 PERA_IMAGE;
const T3 =
  BAHIR_IMAGE;

export default function District() {
  const { add } = useCart();

  const cards = [
    {
      id: "temple",
      title: "Temple of the tooth",
      desc:
        "The Temple of the Tooth in Kandy is a sacred Buddhist site that houses a relic of the tooth of Buddha.",
      distance: "100km",
      fee: "Rs.2000",
      img: T1,
      to: "/places/temple-of-the-tooth"
    },
    {
      id: "peradeniya",
      title: "Peradeniya Botanical Garden",
      desc:
        "Largest botanical garden in Sri Lanka, famous for orchids and towering palm avenues.",
      distance: "92km",
      fee: "Rs.1500",
      img: T2,
      disabled: true
    },
    {
      id: "bahirawa",
      title: "Bahirawa kanda",
      desc:
        "Hilltop temple with a towering white Buddha statue and panoramic views.",
      distance: "110km",
      fee: "Rs.2500",
      img: T3,
      disabled: true
    }
  ];

  return (
    <>
      <section
        className="relative h-[360px]"
        style={{ backgroundImage: `url(${HERO})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 h-full container-xxl flex flex-col items-center justify-center text-center text-white">
          <h1 className="font-serif text-6xl font-extrabold">Kandy  district</h1>
          <p className="text-3xl mt-3">Discover the cultural heart of Sri Lanka</p>
        </div>
      </section>

      <section className="bg-[#1d1c1c] text-white py-14">
        <div className="container-xxl">
          <h2 className="font-serif text-4xl md:text-5xl font-extrabold mb-10">popular destinations</h2>

          <div className="grid md:grid-cols-3 gap-12">
            {cards.map((c) => (
              <div key={c.id} className="bg-[#121212] p-3 rounded-xl">
                <div className="bg-[#c7fff4] p-3 rounded-lg">
                  <img src={c.img} alt={c.title} className="w-full h-64 object-cover rounded-md" />
                </div>
                <div className="mt-3">
                  <h3 className="font-serif text-xl font-bold">{c.title}</h3>
                  <p className="text-sm text-gray-300 mt-2">{c.desc}</p>

                  <div className="text-xs mt-3 space-y-1 text-gray-300">
                    <div>Distance : {c.distance}</div>
                    <div>Estimated transport fee : {c.fee}</div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    {c.disabled ? (
                      <button
                        disabled
                        className="btn-dark opacity-50 cursor-not-allowed"
                        title="Booking not available"
                      >
                        Book Cab
                      </button>
                    ) : c.to ? (
                      <Link to={c.to} className="btn-dark">Book Cab</Link>
                    ) : (
                      <button className="btn-dark">Book Cab</button>
                    )}

                    <button
                      onClick={() => add({ id: c.id, title: c.title, distance: c.distance, fee: c.fee, img: c.img })}
                      className="btn-ghost"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
