// src/models/District.js
import mongoose from "mongoose";

const DistrictSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    places: [{ type: mongoose.Schema.Types.ObjectId, ref: "Place" }]
  },
  { timestamps: true }
);

export default mongoose.model("District", DistrictSchema);
