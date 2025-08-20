// src/pages/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { api } from "../lib/api"; // Use the api function to interact with backend
import { Link } from "react-router-dom";
import KANDY_IMG from "../assets/kandy1.webp";
import COLOMBO_IMG from "../assets/colomboview.jpg";
import GALLE_IMG from "../assets/galle.webp";
import NUWARA_IMG from "../assets/nuwaraeliya.jpg";
import JAFFNA_IMG from "../assets/jaffna.jpg";
import ANURADHAPURA_IMG from "../assets/anuradhapura.jpg";

export default function AdminDashboard() {
  const [districts, setDistricts] = useState([]);
  const [newDistrict, setNewDistrict] = useState("");
  const [newPlace, setNewPlace] = useState({ district: "", name: "", description: "" });
  const [editingDistrictId, setEditingDistrictId] = useState(null);
  const [editingData, setEditingData] = useState({ name: "", blurb: "" });

  const images = {
    Kandy: KANDY_IMG,
    Colombo: COLOMBO_IMG,
    Galle: GALLE_IMG,
    "Nuwara Eliya": NUWARA_IMG,
    Jaffna: JAFFNA_IMG,
    Anuradhapura: ANURADHAPURA_IMG
  };

  // Fetch districts from the backend
  useEffect(() => {
    async function fetchDistricts() {
      const data = await api("/districts");
      setDistricts(data);
    }
    fetchDistricts();
  }, []);

  async function handleAddDistrict() {
    try {
      const data = await api("/districts", { method: "POST", body: { name: newDistrict, blurb: "" } });
      setDistricts((prev) => [...prev, data]);
      setNewDistrict("");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAddPlace() {
    try {
        const {description, district, name} = newPlace
      const data = await api("/places", { method: "POST", body: newPlace });
      setDistricts((prev) => {
        return prev.map((district) =>
          district.name === newPlace.district
            ? { ...district, places: [...(district.places || []), data] }
            : district
        );
      });
      setNewPlace({ district: "", name: "", description: "" });
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSaveEdit(districtId) {
    try {
      const updatedDistrict = await api(`/districts/${districtId}`, {
        method: "PATCH",
        body: editingData
      });
      setDistricts((prev) =>
        prev.map((d) => (d._id === districtId ? updatedDistrict : d))
      );
      setEditingDistrictId(null);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="py-10 container-xxl">
      <h2 className="mb-6 font-serif text-4xl font-bold">Admin Dashboard</h2>

      {/* Add District */}
      <div className="mb-8">
        <h3 className="mb-2 text-2xl font-semibold">Add District</h3>
        <input
          type="text"
          value={newDistrict}
          onChange={(e) => setNewDistrict(e.target.value)}
          placeholder="Enter new district"
          className="mr-2 input"
        />
        <button onClick={handleAddDistrict} className="btn-primary">
          Add District
        </button>
      </div>

      {/* Add Place */}
      <div className="mb-8">
        <h3 className="mb-2 text-2xl font-semibold">Add Place</h3>
        <input
          type="text"
          value={newPlace.name}
          onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
          placeholder="Place name"
          className="mr-2 input"
        />
        <input
          type="text"
          value={newPlace.description}
          onChange={(e) => setNewPlace({ ...newPlace, description: e.target.value })}
          placeholder="Description"
          className="mr-2 input"
        />
        <select
          value={newPlace.district._id}
          onChange={(e) => setNewPlace({ ...newPlace, district: e.target.value  })}
          className="mr-2 input"
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d._id} value={d._id}>{d.name}</option>
          ))}
        </select>
        <button onClick={handleAddPlace} className="btn-primary">
          Add Place
        </button>
      </div>

      {/* Districts Grid */}
      <section>
        <h3 className="mb-4 text-2xl font-semibold">Existing Districts</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {districts.map((d) => (
            <div key={d._id} className="relative overflow-hidden card shadow-soft group">
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={images[d.name] || ""}
                  alt={d.name}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-5 bg-blue-50">
                {editingDistrictId === d._id ? (
                  <>
                    <input
                      type="text"
                      value={editingData.name}
                      onChange={(e) =>
                        setEditingData({ ...editingData, name: e.target.value })
                      }
                      className="mb-2 input"
                    />
                    <input
                      type="text"
                      value={editingData.blurb}
                      onChange={(e) =>
                        setEditingData({ ...editingData, blurb: e.target.value })
                      }
                      className="mb-2 input"
                    />
                    <button
                      className="mr-2 btn-primary"
                      onClick={() => handleSaveEdit(d._id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn-ghost"
                      onClick={() => setEditingDistrictId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="font-serif text-2xl font-extrabold text-gray-900">{d.name}</h3>
                    <p className="mt-1 text-sm text-gray-700">{d.blurb}</p>
                    <button
                      className="mt-4 btn-ghost"
                      onClick={() => {
                        setEditingDistrictId(d._id);
                        setEditingData({ name: d.name, blurb: d.blurb });
                      }}
                    >
                      Edit
                    </button>
                  </>
                )}

                <div className="mt-4">
                  {d.places?.map((place) => (
                    <p key={place._id} className="text-sm text-gray-800">
                      {place.name} - {place.description}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
