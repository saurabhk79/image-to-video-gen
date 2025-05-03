export default function VideoResult({ videoUrl, onBack }) {
    return (
      <div className="card bg-base-100 shadow-xl p-6 relative">
        <button className="btn btn-sm btn-circle absolute top-2 left-2" onClick={onBack}>
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