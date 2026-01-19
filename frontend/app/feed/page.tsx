"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Feed() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const user = localStorage.getItem("guisoga_username");

  useEffect(() => {
    if (!localStorage.getItem("guisoga_token")) router.push("/");
    fetch("http://localhost:5000/posts").then(r => r.json()).then(setPosts);
  }, []);

  const publish = async () => {
    await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author: user, content }),
    });
    setContent("");
    location.reload();
  };

  const logout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl text-yellow-500 font-bold">GUISOGA</h1>
        <button onClick={logout} className="bg-red-600 px-4 py-2 rounded">
          Déconnexion
        </button>
      </div>

      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        className="w-full p-4 text-black rounded"
        placeholder="Exprimez-vous..."
      />

      <button onClick={publish} className="bg-yellow-500 px-6 py-2 mt-3 rounded">
        Publier
      </button>

      {posts.map(p => (
        <div key={p.id} className="mt-6 border border-gray-700 p-4 rounded">
          <strong className="text-yellow-500">{p.author}</strong>
          <p>{p.content}</p>
        </div>
      ))}
    </div>
  );
}
