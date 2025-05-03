const express = require("express");
const multer = require("multer");
require("dotenv").config();

const app = express();
const PORT = 3300;
const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  try {
    console.log("hello");

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
});

app.post("/upload_image", upload.single('image'), (req, res) => {
    try {
        console.log(req.file);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error!" });
    }
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
