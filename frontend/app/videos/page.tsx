"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VideosPage() {
  const router = useRouter();
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const res = await fetch("http://localhost:5000/api/posts");
    const data = await res.json();

    // garder seulement les posts avec vidéos
    const onlyVideos = data.filter((p: any) => p.media && p.media.includes(".mp4"));
    setVideos(onlyVideos);
  };

  return (
    <div style={{ color: "white", padding: 20 }}>
      <h1>🎥 GUISOGA – Vidéos</h1>

      <button onClick={() => router.push("/home")}>⬅ Retour</button>

      {videos.map((video) => (
        <div
          key={video._id}
          style={{
            background: "#111",
            marginTop: 20,
            padding: 15,
            borderRadius: 8,
          }}
        >
          <p>{video.content}</p>
          <video
            src={video.media}
            controls
            style={{ width: "100%", maxHeight: 400 }}
          />
        </div>
      ))}
    </div>
  );
}
