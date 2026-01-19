"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/");
      return;
    }

    setUser(JSON.parse(storedUser));
    fetchPosts();
    fetchUsers();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch("http://localhost:5000/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/api/users");
    const data = await res.json();
    setUsers(data);
  };

  const createPost = async () => {
    if (!content && !file) return alert("Écris un message ou ajoute un média");

    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("content", content);
    if (file) formData.append("media", file);

    await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      body: formData,
    });

    setContent("");
    setFile(null);
    fetchPosts();
  };

  const logout = () => {
    localStorage.clear();
    router.push("/");
  };

  // 🔹 PARTAGE PRO COMME FACEBOOK
  const sharePost = async (post: any) => {
    const shareUrl = window.location.origin + "/post/" + post._id;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "GUISOGA",
          text: post.content,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Partage annulé");
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Lien copié ! Partage-le manuellement.");
    }
  };

  if (!user) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#000", color: "white" }}>
      {/* COLONNE GAUCHE */}
      <div style={{ width: "20%", padding: 20, borderRight: "1px solid #333" }}>
        <h2 style={{ color: "#d4af37" }}>GUISOGA</h2>
        <p>{user.username}</p>
        <button onClick={logout} style={{ marginTop: 20 }}>Déconnexion</button>
      </div>

      {/* FEED CENTRAL */}
      <div style={{ width: "60%", padding: 20 }}>
        <h2 style={{ color: "#ff66ff" }}>Fil d’actualité</h2>

        {/* CRÉATION POST */}
        <div style={{ background: "#111", padding: 15, borderRadius: 8 }}>
          <textarea
            placeholder="Quoi de neuf ?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: "100%", padding: 10 }}
          />

          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={{ marginTop: 10 }}
          />

          <button onClick={createPost} style={{ marginTop: 10 }}>
            Publier
          </button>
        </div>

        {/* FEED POSTS */}
        {posts.map((post) => (
          <div
            key={post._id}
            style={{
              background: "#111",
              marginTop: 20,
              padding: 15,
              borderRadius: 8,
            }}
          >
            <p
              style={{ fontWeight: "bold", cursor: "pointer", color: "#ff66ff" }}
              onClick={() => router.push(`/profile/${post.userId}`)}
            >
              {post.userId}
            </p>

            <p>{post.content}</p>

            {post.media &&
              (post.media.includes(".mp4") ? (
                <video src={post.media} controls style={{ width: "100%", marginTop: 10 }} />
              ) : (
                <img src={post.media} style={{ width: "100%", marginTop: 10 }} />
              ))}

            {/* ACTIONS */}
            <div style={{ marginTop: 10, display: "flex", gap: 15 }}>
              <button
                onClick={async () => {
                  await fetch(`http://localhost:5000/api/posts/${post._id}/like`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: user.id }),
                  });
                  fetchPosts();
                }}
              >
                ❤️ {post.likes.length}
              </button>

              <button
                onClick={() => {
                  const text = prompt("Votre commentaire ?");
                  if (!text) return;

                  fetch(`http://localhost:5000/api/posts/${post._id}/comment`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      userId: user.id,
                      text,
                    }),
                  }).then(() => fetchPosts());
                }}
              >
                💬 {post.comments.length}
              </button>

              <button onClick={() => sharePost(post)}>
                🔁 Partager
              </button>
            </div>

            {/* COMMENTAIRES */}
            <div style={{ marginTop: 10 }}>
              {post.comments.map((c: any, i: number) => (
                <p key={i} style={{ fontSize: 14, color: "#ccc" }}>
                  💬 {c.text}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* COLONNE DROITE */}
      <div style={{ width: "20%", padding: 20, borderLeft: "1px solid #333" }}>
        <h3>Utilisateurs</h3>

        {users.map((u) => (
          <p
            key={u._id}
            style={{ cursor: "pointer", color: "#ff66ff" }}
            onClick={() => router.push(`/profile/${u._id}`)}
          >
            {u.username}
          </p>
        ))}
      </div>
    </div>
  );
}
