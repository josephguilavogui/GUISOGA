const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// STATIC FILES (IMAGES / VIDEOS)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/users", require("./routes/users"));

// ROUTE TEST POUR NAVIGATEUR / TELEPHONE
app.get("/", (req, res) => {
  res.send("GUISOGA backend fonctionne parfaitement 🚀");
});

// MONGODB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.log("❌ MongoDB error", err));

// PORT POUR RENDER OU LOCAL
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 GUISOGA backend lancé sur le port " + PORT);
});
