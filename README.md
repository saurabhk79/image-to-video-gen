# 🧠 AI Image to Video Generator

A full-stack MERN project that allows users to upload an image (via file or URL), optionally give creative instructions, and uses **Google's Image-to-Video AI model (VEO-2)** to generate a video clip. Users can view the result directly on the UI.

---

## 🚀 Features

- Upload image via file **or** provide an image URL
- Enter additional instruction or prompt for the AI model
- Sleek and beautiful UI
- Built using **React (Vite)** + **DaisyUI**, **Express.js**, **MongoDB**, and **Cloudinary**

---

## 🤖 AI Model Used

Used **Google VEO-2 (Image-to-Video)** model via API.

### Why VEO-2?

- Produces **high-quality, cinematic video clips** from a single image
- Supports additional **text prompt guidance** for creative control

---

## 🛠️ How the Pipeline Works

1. **Frontend (React)**
   - User selects image (from disk or pastes a URL)
   - Adds optional instructions
   - Data is sent to server for generating a generation id for accessing the UI.

2. **Backend (Express + Cloudinary)**
   - Accepts form-data using multer js.
   - File will be uploaded  to Cloudinary
   - If URL was provided → forward
   - Send the image URL + prompt to the Google VEO-2 API
   - Receive a `generation_id` from the model
   - Store a new history of the uploading done
   - Return `generation_id`  it to frontend

3. **Frontend (Polling)**
   - Starts polling `/api/upload_status?generation_id=...`
   - Update the history with the new uploaded url
   - Once the video is ready, shows the result

---

## ⚠️ Limitations / Assumptions

- Free-tier Cloudinary used for storing videos (limited bandwidth/storage)
- Polling interval is hardcoded (3s) instead of WebSockets
- Assumes image is always valid — no advanced file type/size validation

---

## 🧰 Tech Stack

- Frontend: React + Vite + DaisyUI + Tailwind
- Backend: Express.js + Cloudinary + form-data parser (formidable)
- DB: MongoDB (optional)
- AI: Google VEO-2 API


## 🧩 Prerequisites

Make sure you have these installed:

- [Node.js (v18+)](https://nodejs.org/)
- [MongoDB (optional)](https://www.mongodb.com/)
- A free [Cloudinary](https://cloudinary.com/) account
- API access to [Google VEO-2]

---

## Configuring the env

CLOUDINARY_CLOUD_NAME=cloudinary_name_here

CLOUDINARY_API_KEY=cloudinary_api_key_here
CLOUDINARY_API_SECRET=cloudinary_api_secret_here

AIMLAPI_KEY=aimlapi_key_here
MONGO_PASS=mongo_url_here


---
## 🖥️ Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/saurabhk79/image-to-video-gen
cd image-to-video-gen
```

### 2. Installing the Packages
```bash
cd server
npm install --legacy-peer-deps

cd ..
cd client
npm install
```

### 3. Running the backend server
``` bash
cd server
npm run dev
```

### 3. Running the frontend server
``` bash
cd client
npm run dev
```