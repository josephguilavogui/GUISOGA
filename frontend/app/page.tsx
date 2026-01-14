"use client";
import { useState, useRef, useEffect } from "react";
import { 
  Home, MessageCircle, Heart, Search, Share2, Plus, 
  MessageSquare, Video, Play, CheckCircle, Star,
  Image as ImageIcon, LogIn, UserPlus, ShieldCheck, Zap, Menu
} from "lucide-react";

export default function GuisogaFacebookClone() {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // CHARGEMENT INITIAL : Vérifie si un compte existe déjà
  useEffect(() => {
    const savedUser = localStorage.getItem("guisoga_user");
    const savedPosts = localStorage.getItem("guisoga_posts");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Posts par défaut si vide
      setPosts([
        { id: 1, author: "Guisoga Cinema", content: "L'empire ne dort jamais. 🌍", videoId: "RCgjYlZ34jw", likes: 1200 },
        { id: 2, author: "Joseph Guilavogui", content: "Bienvenue sur votre réseau éthique.", likes: 850 }
      ]);
    }
  }, []);

  // FONCTION : CRÉER UN COMPTE (PERMANENT)
  const handleSignUp = () => {
    const newUser = { name: "Joseph Guilavogui", id: Date.now() };
    localStorage.setItem("guisoga_user", JSON.stringify(newUser));
    setUser(newUser);
    setIsAuthenticated(true);
  };

  // FONCTION : PUBLIER (RETOUR IMMÉDIAT)
  const handlePublish = () => {
    const text = prompt("Que voulez-vous dire à l'Empire ?");
    if (text) {
      const newPost = {
        id: Date.now(),
        author: user.name,
        content: text,
        likes: 0,
        timestamp: "À l'instant"
      };
      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
      localStorage.setItem("guisoga_posts", JSON.stringify(updatedPosts));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center p-6 text-white">
        <h1 className="text-6xl font-black text-yellow-500 italic mb-8">GUISOGA</h1>
        <div className="w-full max-w-sm space-y-4">
          <button onClick={handleSignUp} className="w-full bg-yellow-500 text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2">
            CRÉER MON COMPTE EMPIRE <UserPlus size={20} />
          </button>
          <p className="text-[10px] text-zinc-500 text-center">Une fois créé, vous n'aurez plus à vous reconnecter.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* HEADER TYPE FACEBOOK */}
      <header className="p-4 flex justify-between items-center bg-zinc-900 border-b border-zinc-800">
        <h2 className="text-2xl font-black text-yellow-500 italic">GUISOGA</h2>
        <div className="flex gap-4">
          <Search size={24} className="text-zinc-400" />
          <MessageCircle size={24} className="text-zinc-400" onClick={() => setActiveTab("messenger")} />
        </div>
      </header>

      {/* ZONE DE CONTENU */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* STORIES (image_b59a51) */}
        <div className="flex gap-2 p-4 overflow-x-auto scrollbar-hide bg-zinc-950">
          <div className="min-w-[110px] h-44 bg-zinc-800 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 cursor-pointer" onClick={() => alert("Fonction Story activée")}>
            <Plus className="text-yellow-500" size={32} />
            <span className="text-[10px] font-bold uppercase mt-2">Créer Story</span>
          </div>
          {[1, 2, 3].map(i => (
            <div key={i} className="min-w-[110px] h-44 bg-zinc-900 rounded-xl relative overflow-hidden">
               <img src={`https://picsum.photos/200/400?random=${i}`} className="w-full h-full object-cover opacity-50" />
            </div>
          ))}
        </div>

        {/* BARRE DE PUBLICATION (image_b59a51) */}
        <div className="p-4 bg-zinc-900 border-y border-zinc-800 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">J</div>
          <button onClick={handlePublish} className="flex-1 bg-zinc-800 text-left px-5 py-2.5 rounded-full text-zinc-500 text-sm">
            Quoi de neuf Joseph ?
          </button>
          <ImageIcon className="text-green-500" size={24} />
        </div>

        {/* FLUX DE PUBLICATIONS (VRAIS RETOURS) */}
        {posts.map(post => (
          <div key={post.id} className="bg-zinc-900 mt-2 border-y border-zinc-800 p-4 animate-in fade-in duration-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-yellow-500" />
              <div>
                <p className="text-sm font-black uppercase">{post.author}</p>
                <p className="text-[10px] text-zinc-500 italic">Certifié Empire</p>
              </div>
            </div>
            <p className="text-sm mb-4 leading-relaxed">{post.content}</p>
            {post.videoId && (
              <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4">
                <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${post.videoId}`} />
              </div>
            )}
            <div className="flex justify-between border-t border-zinc-800 pt-4">
              <div className="flex gap-6">
                <div className="flex items-center gap-2 cursor-pointer hover:text-red-500"><Heart size={22} /> <span className="text-xs font-bold">{post.likes}</span></div>
                <div className="flex items-center gap-2 cursor-pointer hover:text-yellow-500"><MessageSquare size={22} /> <span className="text-xs font-bold">Commenter</span></div>
              </div>
              <Share2 size={22} className="text-zinc-500" />
            </div>
          </div>
        ))}
      </div>

      {/* NAVIGATION BASSE (image_b5b857) */}
      <nav className="fixed bottom-0 w-full bg-zinc-900 border-t border-zinc-800 flex justify-around p-4 z-50">
        <Home className={activeTab === "home" ? "text-yellow-500" : "text-zinc-500"} onClick={() => setActiveTab("home")} />
        <Zap className={activeTab === "match" ? "text-yellow-500" : "text-zinc-500"} onClick={() => setActiveTab("match")} />
        <div className="bg-white text-black rounded-xl p-1" onClick={handlePublish}><Plus size={28} /></div>
        <Video className={activeTab === "video" ? "text-yellow-500" : "text-zinc-500"} onClick={() => setActiveTab("video")} />
        <Menu className={activeTab === "menu" ? "text-yellow-500" : "text-zinc-500"} onClick={() => setActiveTab("menu")} />
      </nav>
    </main>
  );
}