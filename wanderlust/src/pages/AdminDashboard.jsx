import { useState, useEffect } from "react";
import { api } from "../lib/api"; // Use the api function to interact with backend
import { Link } from "react-router-dom";
import KANDY_IMG from "../assets/kandy1.webp";
import COLOMBO_IMG from "../assets/colomboview.jpg";
import GALLE_IMG from "../assets/galle.webp";
import NUWARA_IMG from "../assets/nuwaraeliya.jpg";
import JAFFNA_IMG from "../assets/jaffna.jpg";
import ANURADHAPURA_IMG from "../assets/anuradhapura.jpg";
import { Compass } from "lucide-react"; // Import Compass icon

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
    <div className="relative min-h-screen bg-gray-50">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-center bg-no-repeat bg-cover opacity-900"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      ></div>

      <div className="relative z-10">
        {/* Header with Wanderlust Icon and Name */}
        <div className="border-b border-gray-200 shadow-sm bg-white/95 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="grid w-8 h-8 text-white rounded-full bg-brand-600 place-content-center">
                <Compass size={18} />
              </div>
              <span className="font-semibold tracking-wide">Wanderlust</span>
            </Link>

            <div className="flex items-center justify-center text-gray-600">
  <div className="text-3xl font-medium">
    Admin Dashboard
  </div>
  <div className="ml-2 text-lg">
    — Manage districts and places
  </div>
</div>

          </div>
        </div>
      </div>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Action Cards */}
        <div className="grid gap-6 mb-8 md:grid-cols-2">
          {/* Add District Card */}
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white/90 backdrop-blur-sm">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-10 h-10 mr-3 bg-blue-100 rounded-full">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-medium text-gray-900">Add New District</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  District Name
                </label>
                <input
                  type="text"
                  value={newDistrict}
                  onChange={(e) => setNewDistrict(e.target.value)}
                  placeholder="Enter district name"
                  className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button 
                onClick={handleAddDistrict} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add District
              </button>
            </div>
          </div>

          {/* Add Place Card */}
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white/90 backdrop-blur-sm">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-10 h-10 mr-3 bg-green-100 rounded-full">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="text-lg font-medium text-gray-900">Add New Place</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Place Name
                </label>
                <input
                  type="text"
                  value={newPlace.name}
                  onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
                  placeholder="Enter place name"
                  className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  value={newPlace.description}
                  onChange={(e) => setNewPlace({ ...newPlace, description: e.target.value })}
                  placeholder="Enter description"
                  className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  District
                </label>
                <select
                  value={newPlace.district._id}
                  onChange={(e) => setNewPlace({ ...newPlace, district: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select District</option>
                  {districts.map((d) => (
                    <option key={d._id} value={d._id}>{d.name}</option>
                  ))}
                </select>
              </div>
              
              <button 
                onClick={handleAddPlace} 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Add Place
              </button>
            </div>
          </div>
        </div>

        {/* Districts Section */}
        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm bg-white/90 backdrop-blur-sm">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/90 backdrop-blur-sm">
            <h3 className="text-xl font-medium text-gray-900">Districts ({districts.length})</h3>
            <p className="mt-1 text-sm text-gray-600">Manage existing districts and their places</p>
          </div>
          
          <div className="p-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {districts.map((d) => (
                <div key={d._id} className="overflow-hidden transition-shadow duration-200 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md">
                  <div className="bg-gray-200 aspect-w-16 aspect-h-9">
                    <img
                      src={images[d.name] || ""}
                      alt={d.name}
                      className="object-cover w-full h-48"
                    />
                  </div>

                  <div className="p-5">
                    {editingDistrictId === d._id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editingData.name}
                          onChange={(e) =>
                            setEditingData({ ...editingData, name: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="District name"
                        />
                        <input
                          type="text"
                          value={editingData.blurb}
                          onChange={(e) =>
                            setEditingData({ ...editingData, blurb: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Description"
                        />
                        <div className="flex space-x-2">
                          <button
                            className="flex-1 px-3 py-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
                            onClick={() => handleSaveEdit(d._id)}
                          >
                            Save
                          </button>
                          <button
                            className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 bg-gray-100 rounded-md hover:bg-gray-200"
                            onClick={() => setEditingDistrictId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{d.name}</h3>
                            {d.blurb && <p className="mt-1 text-sm text-gray-600">{d.blurb}</p>}
                          </div>
                        </div>

                        {d.places && d.places.length > 0 && (
                          <div className="pt-3 mt-4 border-t border-gray-100">
                            <h4 className="mb-2 text-xs font-medium tracking-wide text-gray-500 uppercase">
                              Places ({d.places.length})
                            </h4>
                            <div className="space-y-2">
                              {d.places.map((place) => (
                                <div key={place._id} className="p-3 rounded-md bg-gray-50">
                                  <p className="text-sm font-medium text-gray-900">{place.name}</p>
                                  <p className="mt-1 text-xs text-gray-600">{place.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {districts.length === 0 && (
              <div className="py-12 text-center">
                <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No districts</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by adding your first district.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
