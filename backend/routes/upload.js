const router = require("express").Router();
const multer = require("multer");
const path = require("path");

// STORAGE CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "_" + file.originalname.replace(/\s+/g, "")
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
});

// UPLOAD ROUTE
router.post("/", upload.single("file"), (req, res) => {
  res.status(200).json({
    fileUrl: `http://localhost:5000/uploads/${req.file.filename}`,
  });
});

module.exports = router;
