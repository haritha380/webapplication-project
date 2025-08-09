import DestinationCard from "../components/DestinationCard.jsx";
import GAL_IMAGE from "../assets/galle.webp";
import KAN_IMAGE from "../assets/kandy.jpg"; 
import COL_IMAGE from "../assets/colombo.jpg";
import MON_IMAGE from "../assets/mountain.jpg";

const HERO =
    MON_IMAGE;
const IMG_COLOMBO =
    COL_IMAGE;
const IMG_KANDY =
  KAN_IMAGE;
const IMG_GALLE = GAL_IMAGE;


export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative h-[440px] md:h-[520px] overflow-hidden"
        style={{ backgroundImage: `url(${HERO})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 h-full container-xxl flex flex-col items-center justify-center text-center text-white">
          <h1 className="h-hero">Discover Your Next Adventure</h1>
          <p className="text-lg md:text-xl mt-3">
            Explore curated travel experiences across the globe
          </p>
          <a href="#popular" className="btn-primary mt-6">Start Exploring</a>
        </div>
      </section>

      {/* Popular Destinations */}
      <section id="popular" className="container-xxl py-12">
        <h2 className="h-section mb-6">Popular destinations</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <DestinationCard
            image={IMG_COLOMBO}
            title="Colombo"
            blurb="The vibrant commercial capital with colonial architecture and modern attractions"
            to="/districts/colombo" 
             
          />
          <DestinationCard
            image={IMG_KANDY}
            title="Kandy"
            blurb="Home to the Sacred Temple of the Tooth and rich cultural heritage"
            to="/districts/kandy"
          />
          <DestinationCard
            image={IMG_GALLE}
            title="Galle"
            blurb="Historic port city with a well-preserved Dutch fortress"
            to="/districts"
          />
        </div>
      </section>
    </>
  );
}
