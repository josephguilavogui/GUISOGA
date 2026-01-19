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

// ROUTES (⚠️ on met bien .js à la fin)
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/posts", require("./routes/posts.js"));
app.use("/api/upload", require("./routes/upload.js"));
app.use("/api/users", require("./routes/users.js"));

// MONGODB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.log("❌ MongoDB error", err));

// ⚠️ PORT OBLIGATOIRE POUR RENDER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 GUISOGA backend lancé sur le port ${PORT}`)
);
