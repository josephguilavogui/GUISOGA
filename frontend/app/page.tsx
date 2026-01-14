"use client";
import { useState, useRef, useEffect } from "react";
import { 
  Home, MessageCircle, Heart, Search, Share2, Plus, 
  MessageSquare, Video, Play, CheckCircle, Star,
  Image as ImageIcon, UserPlus, Zap, Menu, Send, X, Camera, Bell
} from "lucide-react";

export default function GuisogaUltimate() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("home"); // home, messenger, video, market
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. PERSISTANCE : Se souvenir de l'utilisateur
  useEffect(() => {
    const savedAuth = localStorage.getItem("guisoga_auth");
    const savedPosts = localStorage.getItem("guisoga_posts");
    if (savedAuth === "true") setIsAuthenticated(true);
    if (savedPosts) setPosts(JSON.parse(savedPosts));
    else setPosts([
      { id: "1", author: "Joseph Guilavogui", content: "L'Empire Guisoga est maintenant en ligne ! 🚀", likes: 500, comments: [] },
      { id: "2", author: "Guisoga Ads", content: "Rejoignez l'élite du business africain.", isAd: true, likes: 120, comments: [] }
    ]);
  }, []);

  // 2. FONCTIONS DE L'EMPIRE
  const handleLogin = () => {
    localStorage.setItem("guisoga_auth", "true");
    setIsAuthenticated(true);
  };

  const handleCreatePost = () => {
    const text = prompt("Exprimez-vous...");
    if (text) {
      const newP = { id: Date.now().toString(), author: "Joseph Guilavogui", content: text, likes: 0, comments: [] };
      const updated = [newP, ...posts];
      setPosts(updated);
      localStorage.setItem("guisoga_posts", JSON.stringify(updated));
    }
  };

  const addComment = (postId: string) => {
    if (!newComment[postId]) return;
    const updated = posts.map(p => {
      if (p.id === postId) {
        return { ...p, comments: [...(p.comments || []), { text: newComment[postId], user: "Joseph" }] };
      }
      return p;
    });
    setPosts(updated);
    localStorage.setItem("guisoga_posts", JSON.stringify(updated));
    setNewComment({ ...newComment, [postId]: "" });
  };

  if (!isAuthenticated) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center p-8 text-white">
        <h1 className="text-6xl font-black text-yellow-500 italic mb-4">GUISOGA</h1>
        <div className="w-full max-w-sm space-y-4">
          <input className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl outline-none" placeholder="Email ou téléphone" />
          <input type="password" className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl outline-none" placeholder="Mot de passe" />
          <button onClick={handleLogin} className="w-full bg-yellow-500 text-black font-black py-4 rounded-2xl shadow-xl active:scale-95 transition-all">
            CRÉER MON COMPTE
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* HEADER FACEBOOK STYLE */}
      <header className="px-4 py-3 flex justify-between items-center bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
        <h1 className="text-2xl font-black text-yellow-500 italic">GUISOGA</h1>
        <div className="flex gap-3">
          <div className="p-2 bg-zinc-800 rounded-full"><Search size={20} /></div>
          <div className="p-2 bg-zinc-800 rounded-full" onClick={() => setActiveTab("messenger")}><MessageCircle size={20} className={activeTab === "messenger" ? "text-yellow-500" : ""} /></div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
        {activeTab === "home" && (
          <div className="animate-in fade-in">
            {/* STORIES */}
            <div className="flex gap-2 p-3 overflow-x-auto bg-zinc-950">
              <div className="min-w-[100px] h-40 bg-zinc-800 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 cursor-pointer" onClick={handleCreatePost}>
                <Plus className="text-yellow-500" />
                <span className="text-[9px] font-bold mt-1 uppercase tracking-widest">Story</span>
              </div>
              {[1, 2, 3].map(i => (
                <div key={i} className="min-w-[100px] h-40 bg-zinc-900 rounded-2xl relative overflow-hidden">
                   <img src={`https://picsum.photos/200/400?random=${i}`} className="w-full h-full object-cover opacity-40" />
                   <div className="absolute top-2 left-2 w-7 h-7 rounded-full border border-yellow-500 bg-zinc-800" />
                </div>
              ))}
            </div>

            {/* PUB Joseph */}
            <div className="p-4 bg-zinc-900 border-y border-zinc-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-black">J</div>
              <button onClick={handleCreatePost} className="flex-1 bg-zinc-800 text-left px-5 py-2.5 rounded-full text-zinc-500 text-sm">Quoi de neuf, Joseph ?</button>
              <ImageIcon className="text-green-500" size={24} />
            </div>

            {/* FEED */}
            {posts.map(post => (
              <div key={post.id} className="bg-zinc-900 mt-2 border-y border-zinc-800 pb-4">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-yellow-500" />
                    <div><p className="text-sm font-black uppercase">{post.author}</p><p className="text-[10px] text-zinc-500">Certifié Empire</p></div>
                  </div>
                  <MoreVertical size={18} className="text-zinc-500" />
                </div>
                <p className="px-4 pb-4 text-sm leading-relaxed">{post.content}</p>
                
                {/* INTERACTIONS */}
                <div className="p-4 flex justify-between border-t border-zinc-800">
                  <div className="flex gap-6">
                    <div className="flex items-center gap-1 cursor-pointer"><Heart size={20} className="hover:text-red-500" /> <span className="text-xs">{post.likes}</span></div>
                    <div className="flex items-center gap-1 cursor-pointer"><MessageSquare size={20} /> <span className="text-xs">{post.comments?.length || 0}</span></div>
                  </div>
                  <Share2 size={20} className="text-zinc-500" />
                </div>

                {/* ZONE COMMENTAIRE */}
                <div className="px-4 space-y-2">
                  {post.comments?.map((c: any, i: number) => (
                    <div key={i} className="flex gap-2 items-start">
                      <div className="bg-zinc-800 p-2 rounded-2xl text-[11px]"><span className="font-bold text-yellow-500">{c.user}:</span> {c.text}</div>
                    </div>
                  ))}
                  <div className="flex gap-2 mt-2">
                    <input 
                      value={newComment[post.id] || ""} 
                      onChange={(e) => setNewComment({...newComment, [post.id]: e.target.value})}
                      className="flex-1 bg-zinc-800 rounded-full px-4 py-1.5 text-xs outline-none" 
                      placeholder="Votre commentaire..." 
                    />
                    <button onClick={() => addComment(post.id)} className="text-yellow-500 font-bold text-xs uppercase">Ok</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MESSENGER INTÉGRÉ */}
        {activeTab === "messenger" && (
          <div className="h-full bg-black flex flex-col animate-in slide-in-from-right">
            <div className="p-4 border-b border-zinc-800 flex items-center gap-4">
               <ChevronLeft onClick={() => setActiveTab("home")} className="text-yellow-500" />
               <h2 className="text-xl font-black">MESSENGER</h2>
            </div>
            {/* Liste de contacts */}
            {!selectedChat ? (
              <div className="p-4 space-y-4">
                {["Inès (Match)", "Thomas (Empire)", "Support Guisoga"].map(name => (
                  <div key={name} onClick={() => setSelectedChat(name)} className="flex items-center gap-4 bg-zinc-900 p-4 rounded-2xl cursor-pointer hover:bg-zinc-800 transition-all">
                    <div className="w-12 h-12 rounded-full bg-zinc-800 border-2 border-yellow-500" />
                    <div className="flex-1">
                      <p className="font-bold">{name}</p>
                      <p className="text-xs text-zinc-500 italic">En ligne il y a 5 min</p>
                    </div>
                    <MessageCircle size={18} className="text-yellow-500" />
                  </div>
                ))}
              </div>
            ) : (
              /* Fenêtre de chat réelle */
              <div className="flex flex-col h-full bg-zinc-950">
                <div className="p-4 bg-zinc-900 flex justify-between items-center">
                  <span className="font-black text-yellow-500 uppercase tracking-tighter">{selectedChat}</span>
                  <X onClick={() => setSelectedChat(null)} size={20} />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-end gap-3 overflow-y-auto">
                   <div className="bg-zinc-800 p-3 rounded-2xl rounded-bl-none max-w-[80%] text-sm">Bonjour ! Bienvenue dans la discussion.</div>
                   <div className="bg-yellow-500 text-black font-bold p-3 rounded-2xl rounded-br-none max-w-[80%] self-end text-sm">Merci, le système fonctionne !</div>
                </div>
                <div className="p-4 border-t border-zinc-800 bg-zinc-900 flex gap-3 items-center">
                   <Plus size={20} className="text-zinc-500" />
                   <input className="flex-1 bg-black border border-zinc-800 rounded-full px-4 py-2 text-sm outline-none" placeholder="Message..." />
                   <Send className="text-yellow-500" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* BARRE DE NAVIGATION FIXE */}
      <nav className="fixed bottom-0 w-full bg-zinc-900 border-t border-zinc-800 flex justify-around p-4 z-50">
        <Home className={activeTab === "home" ? "text-yellow-500" : "text-zinc-500"} onClick={() => setActiveTab("home")} />
        <Zap className={activeTab === "market" ? "text-yellow-500" : "text-zinc-500"} onClick={() => setActiveTab("market")} />
        <div className="bg-white text-black rounded-xl p-1 shadow-lg active:scale-90 transition-all" onClick={handleCreatePost}><Plus size={28} /></div>
        <Video className={activeTab === "video" ? "text-yellow-500" : "text-zinc-500"} onClick={() => setActiveTab("video")} />
        <Menu className={activeTab === "menu" ? "text-yellow-500" : "text-zinc-500"} onClick={() => setActiveTab("menu")} />
      </nav>
    </main>
  );
}