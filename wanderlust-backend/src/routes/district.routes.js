// src/routes/district.routes.js
import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import District from "../models/District.js"; // Define this model

const router = Router();

// Create a district
router.post("/", requireAuth, async (req, res) => {
  const { name } = req.body;
  const district = new District({ name });
  await district.save();
  res.status(201).json(district);
});

// Get all districts
router.get("/", requireAuth, async (req, res) => {
  const districts = await District.find().populate("places").lean();
  res.json(districts);
});

router.get("/:districtId", async (req, res) => {
  const { districtId } = req.params;
  const district = await District.findById(districtId);
  res.json(district)
});

export default router;
