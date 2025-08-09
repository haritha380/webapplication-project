import { useCart } from "../store/CartContext.jsx";

const BG =
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop";

export default function Cart() {
  const { items, remove, clear } = useCart();

  return (
    <>
      <section className="relative h-28 bg-[#1f1a17] text-white flex items-center justify-center">
        <div className="container-xxl text-center">
          <h1 className="h-hero text-3xl md:text-4xl">Cart</h1>
          <p className="opacity-80 text-sm">Saved places for travel later</p>
        </div>
      </section>

      <section
        className="relative min-h-[420px]"
        style={{ backgroundImage: `url(${BG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative container-xxl py-12">
          {items.length === 0 ? (
            <div className="card bg-white/90 p-8 max-w-lg">
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {items.map((i) => (
                <div key={i.id} className="flex gap-4">
                  <img src={i.img} alt={i.title} className="w-72 h-44 object-cover rounded-lg" />
                  <div className="bg-[#c6ffee] rounded-2xl p-5 w-full">
                    <div className="font-serif text-2xl font-bold mb-2">{i.title}</div>
                    <div className="text-sm">Distance : {i.distance}</div>
                    <div className="text-sm">Transport fee : {i.fee}</div>

                    <div className="mt-5 flex items-center gap-4">
                      <button className="btn-dark">Book Taxi</button>
                      <button onClick={() => remove(i.id)} className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <div className="mt-8">
              <button onClick={clear} className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">Clear All</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
