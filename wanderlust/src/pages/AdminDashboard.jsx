// src/pages/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { api } from "../lib/api"; // Use the api function to interact with backend

export default function AdminDashboard() {
  const [districts, setDistricts] = useState([]);
  const [newDistrict, setNewDistrict] = useState("");
  const [newPlace, setNewPlace] = useState({ district: "", name: "", description: "" });

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
      const data = await api("/districts", { method: "POST", body: { name: newDistrict } });
      setDistricts((prev) => [...prev, data]);
      setNewDistrict("");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAddPlace() {
    try {
      const data = await api("/places", { method: "POST", body: newPlace });
      setDistricts((prev) => {
        const updated = prev.map((district) =>
          district.name === newPlace.district
            ? { ...district, places: [...district.places, data] }
            : district
        );
        return updated;
      });
      setNewPlace({ district: "", name: "", description: "" });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div>
        <h3>Add District</h3>
        <input
          type="text"
          value={newDistrict}
          onChange={(e) => setNewDistrict(e.target.value)}
          placeholder="Enter new district"
        />
        <button onClick={handleAddDistrict}>Add District</button>
      </div>

      <div>
        <h3>Add Place</h3>
        <input
          type="text"
          value={newPlace.name}
          onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
          placeholder="Place name"
        />
        <input
          type="text"
          value={newPlace.description}
          onChange={(e) => setNewPlace({ ...newPlace, description: e.target.value })}
          placeholder="Description"
        />
        <select
          value={newPlace.district}
          onChange={(e) => setNewPlace({ ...newPlace, district: e.target.value })}
        >
          {districts.map((district) => (
            <option key={district._id} value={district.name}>
              {district.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddPlace}>Add Place</button>
      </div>

      <div>
        <h3>Existing Districts</h3>
        <ul>
          {districts.map((district) => (
            <li key={district._id}>
              {district.name}
              <ul>
                {district.places.map((place) => (
                  <li key={place._id}>
                    {place.name} - {place.description}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
