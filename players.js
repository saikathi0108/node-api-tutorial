const express = require("express");
const router = express.Router();
const Player = require("../models/playerModel");
const mongoose = require("mongoose");

// GET all players
router.get("/", async (req, res) => {
  const players = await Player.find();
  res.status(200).json(players);
});

// POST a new player
router.post("/", async (req, res) => {
  const { name, number, position } = req.body;
  try {
    const player = await Player.create({ name, number, position });
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET a single player by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Player does not exist." });
  }
  const player = await Player.findById(id);
  if (!player) {
    return res.status(404).json({ error: "Player does not exist." });
  }
  res.status(200).json(player);
});

// PATCH a player by ID
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Player does not exist." });
    }
    const player = await Player.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true }
    );
    if (!player) {
        return res.status(404).json({ error: "Player does not exist." });
    }
    res.status(200).json(player);
});

// DELETE a player by ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Player does not exist." });
    }
    const player = await Player.findByIdAndDelete(id);
    if (!player) {
        return res.status(404).json({ error: "Player does not exist." });
    }
    res.status(204).send(); // No content
});



module.exports = router;

