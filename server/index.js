const express = require("express");
const multer = require("multer");
require("dotenv").config();
var cors = require("cors");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const mongoose = require("mongoose");

const { uploadImageToModel, getVideoFromModel } = require("./helper/api-calls");
const {
  createNewHistory,
  findByGenerationId,
} = require("./helper/history-service");

const app = express();
const PORT = 3300;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
mongoose
  .connect(process.env.MONGO_PASS)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

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

// ROUTES
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

    await createNewHistory({
      image_url: file.path,
      generation_id: data.id,
      prompt_instructions: body?.instructions,
      status: data?.status,
    });

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
});

app.get("/api/upload_status", async (req, res) => {
  try {
    const { generation_id } = req.query;

    const history = await findByGenerationId(generation_id);

    if (!history) {
      return res.status(404).json({ message: "Invalid Generation Id" });
    }

    const { data } = await getVideoFromModel(generation_id);

    history.image_url = data?.video?.url;
    history.status = data?.status;

    await history.save();

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
