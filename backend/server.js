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


// MONGODB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.log("❌ MongoDB error", err));

app.listen(5000, () =>
  console.log("🚀 GUISOGA backend → http://localhost:5000")
);
