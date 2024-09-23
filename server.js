const express = require('express');
const mongoose = require('mongoose');
const playerRoutes = require('./routes/players');

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/players", playerRoutes);

mongoose.connect("mongodb://localhost:27017/NodeAPI") // replace with your database name
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => console.error("Failed to connect", err));
