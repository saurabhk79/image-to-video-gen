import { useEffect, useState } from "react";
import { config } from "../config";

export default function VideoResult({ videoData, onBack }) {
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    if (!videoData?.id) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          config.backendUrl + "/api/upload_status?generation_id=" + videoData.id
        );
        const { data } = await res.json();

        console.log("🚀 ~ interval ~ data:", data);
        if (data.status === "completed") {
          setVideoUrl(data.video.url);
          clearInterval(interval);
        }
      } catch (err) {
        console.log("🚀 ~ interval ~ err:", err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [videoData]);

  return (
    <div className="card bg-base-100 shadow-xl p-6 relative">
      <button
        className="btn btn-sm btn-circle absolute top-2 left-2"
        onClick={onBack}
      >
        ✕
      </button>
      <h2 className="card-title mb-4">Result</h2>

      {!videoUrl ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-bars loading-lg"></span>
          <span className="ml-2">Processing...</span>
        </div>
      ) : (
        <video src={videoUrl} controls className="w-full rounded-lg" />
      )}
    </div>
  );
}
