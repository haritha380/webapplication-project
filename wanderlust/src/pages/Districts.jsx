import { Link } from "react-router-dom";
import KANDY_IMG from "../assets/kandy1.webp";
import COLOMBO_IMG from "../assets/colomboview.jpg";
import GALLE_IMG from "../assets/galle.webp";
import NUWARA_IMG from "../assets/nuwaraeliya.jpg";
import JAFFNA_IMG from "../assets/jaffna.jpg";
import ANURADHAPURA_IMG from "../assets/anuradhapura.jpg";


const districts = [
  {
    id: "kandy",
    name: "Kandy",
    to: "/districts/kandy", // ✅ existing page
    img: KANDY_IMG,
    blurb: "Cultural capital; Temple of the Tooth, botanical gardens."
  },
  {
    id: "colombo",
    name: "Colombo",
    to: "/districts/colombo", 
    img: COLOMBO_IMG,
    blurb: "Modern skyline; Lotus Tower, Port City, seafront promenade."
  },
  {
    id: "galle",
    name: "Galle",
    to: "#", // set to /districts/galle when you build it
    img: GALLE_IMG,
    blurb: "UNESCO Dutch Fort, cobbled lanes, blue bays."
  },
  {
    id: "nuwara-eliya",
    name: "Nuwara Eliya",
    to: "#",
    img: NUWARA_IMG,
    blurb: "Tea estates, misty hills, cool climate."
  },
  {
    id: "jaffna",
    name: "Jaffna",
    to: "#",
    img: JAFFNA_IMG,
    blurb: "Northern culture, forts, islands & cuisine."
  },
  {
    id: "anuradhapura",
    name: "Anuradhapura",
    to: "#",
    img: ANURADHAPURA_IMG,
    blurb: "Ancient stupas, sacred Bo tree, heritage ruins."
  }
];

export default function Districts() {
  return (
    <>
      {/* Banner */}
      <section className="relative h-[260px] bg-black text-white">
        <div className="container-xxl h-full flex flex-col items-center justify-center text-center">
          <h1 className="font-serif text-5xl font-extrabold">Select District</h1>
          <p className="mt-2 text-lg opacity-90">Choose a district to explore destinations</p>
        </div>
      </section>

      {/* Grid */}
      <section className="container-xxl py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {districts.map((d) => (
            <div key={d.id} className="card overflow-hidden shadow-soft group">
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={d.img}
                  alt={d.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-5 bg-blue-50">
                <h3 className="font-serif text-2xl font-extrabold text-gray-900">{d.name}</h3>
                <p className="text-sm text-gray-700 mt-1">{d.blurb}</p>

                {d.to === "#" ? (
                  <button
                    disabled
                    className="mt-4 btn-ghost opacity-60 cursor-not-allowed"
                    title="Coming soon"
                  >
                    Coming soon
                  </button>
                ) : (
                  <Link to={d.to} className="mt-4 inline-block btn-primary">
                    Explore
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
