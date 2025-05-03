const express = require("express");
const multer = require("multer");
require("dotenv").config();
var cors = require("cors");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { uploadImageToModel, getVideoFromModel } = require("./helper/api-calls");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = 3300;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "image-to-video-images",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const imageUpload = multer({ storage: imageStorage });

app.get("/", (req, res) => {
  try {
    console.log("hello");

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
});

app.post("/api/upload_image", imageUpload.single("image"), async (req, res) => {
  try {
    const { file, body } = req;
    const data = await uploadImageToModel(file, body.instructions);

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
});

app.get("/api/upload_status", async (req, res) => {
  try {
    const { generation_id } = req.query;

    const response = await getVideoFromModel(generation_id);

    return res.status(200).json({ data: response });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
