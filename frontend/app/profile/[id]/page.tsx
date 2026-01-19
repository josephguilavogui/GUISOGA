"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage({ params }: any) {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchProfile();
    fetchPosts();
  }, []);

  const fetchProfile = async () => {
    const res = await fetch(`http://localhost:5000/api/users/${params.id}`);
    const data = await res.json();
    setProfile(data);
  };

  const fetchPosts = async () => {
    const res = await fetch(`http://localhost:5000/api/posts?userId=${params.id}`);
    const data = await res.json();
    setPosts(data);
  };

  const follow = async () => {
    await fetch(`http://localhost:5000/api/users/${params.id}/follow`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id }),
    });

    fetchProfile();
  };

  if (!profile) return <p style={{ color: "white" }}>Chargement...</p>;

  const isFollowing = profile.followers.includes(user.id);

  return (
    <div style={{ color: "white", padding: 20 }}>
      <button onClick={() => router.push("/home")}>⬅ Retour</button>

      <h1>{profile.username}</h1>
      <p>👥 {profile.followers.length} abonnés</p>

      {user.id !== profile._id && (
        <button onClick={follow}>
          {isFollowing ? "Se désabonner" : "S’abonner"}
        </button>
      )}

      <h2 style={{ marginTop: 20 }}>Publications</h2>

      {posts.map((post) => (
        <div key={post._id} style={{ background: "#111", marginTop: 20, padding: 15 }}>
          <p>{post.content}</p>

          {post.media &&
            (post.media.includes(".mp4") ? (
              <video src={post.media} controls style={{ width: "100%" }} />
            ) : (
              <img src={post.media} style={{ width: "100%" }} />
            ))}
        </div>
      ))}
    </div>
  );
}
