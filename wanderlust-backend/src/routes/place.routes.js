// src/routes/place.routes.js
import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import Place from "../models/Place.js"; // Define this model

const router = Router();

// Create a place
router.post("/", requireAuth, async (req, res) => {
  const { district, name, description } = req.body;
  const place = new Place({ district, name, description });
  await place.save();
  res.status(201).json(place);
});

export default router;
