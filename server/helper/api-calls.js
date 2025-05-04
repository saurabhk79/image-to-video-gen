require("dotenv").config();

async function uploadImageToModel(file, instructions) {
  try {
    const response = await fetch(
      "https://api.aimlapi.com/v2/generate/video/google/generation",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIMLAPI_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "veo2/image-to-video",
          prompt: instructions,
          image_url: file.path,
          aspect_ratio: "16:9",
          duration: 8,
        }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

async function getVideoFromModel(generation_id) {
  try {
    const response = await fetch(
      `https://api.aimlapi.com/v2/generate/video/google/generation?generation_id=${generation_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.AIMLAPI_KEY}`,
          Accept: "*/*",
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  uploadImageToModel,
  getVideoFromModel,
};
