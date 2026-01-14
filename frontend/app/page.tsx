"use client";
import { useState, useRef, useEffect } from "react";
import { 
  Home, MessageCircle, Heart, Search, Share2, Plus, 
  MessageSquare, Video, Play, CheckCircle, Star,
  Image as ImageIcon, UserPlus, Zap, Menu, Send, X, ChevronLeft, MoreVertical, Shield
} from "lucide-react";

export default function GuisogaApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("home"); 
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  
  // PERSISTANCE : Mémorise l'utilisateur et les publications
  useEffect(() => {
    const savedAuth = localStorage.getItem("guisoga_auth");
    const savedPosts = localStorage.getItem("guisoga_posts");
    if (savedAuth === "true") setIsAuthenticated(true);
    if (savedPosts) setPosts(JSON.parse(savedPosts));
    else {
      setPosts([
        { id: "1", author: "Joseph Guilavogui", content: "Bienvenue sur GUISOGA. L'excellence est notre seule option.", likes: 1500, comments: [], timestamp: "Officiel" },
        { id: "2", author: "GUISOGA News", content: "Le déploiement de l'algorithme éthique est terminé.", likes: 340, comments: [], isAd: true }
      ]);
    }
  }, []);

  const handleSignUp = () => {
    localStorage.setItem("guisoga_auth", "true");
    setIsAuthenticated(true);
  };

  const handlePublish = () => {
    const text = prompt("Publication GUISOGA : Que voulez-vous dire ?");
    if (text) {
      const newP = { 
        id: Date.now().toString(), 
        author: "Joseph Guilavogui", 
        content: text, 
        likes: 0, 
        comments: [],
        timestamp: "Maintenant"
      };
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

  // --- ÉCRAN DE CONNEXION GUISOGA ---
  if (!isAuthenticated) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center p-8 text-white">
        <div className="mb-12 animate-pulse">
           <h1 className="text-7xl font-black text-yellow-500 italic tracking-tighter mb-2">GUISOGA</h1>
           <div className="h-1 w-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
        </div>
        <div className="w-full max-w-sm space-y-5">
          <div className="space-y-2">
            <input className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl outline-none focus:border-yellow-500 transition-all" placeholder="Identifiant GUISOGA" />
            <input type="password" className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl outline-none focus:border-yellow-500 transition-all" placeholder="Code secret" />
          </div>
          <button onClick={handleSignUp} className="w-full bg-yellow-500 text-black font-extrabold py-4 rounded-2xl shadow-lg shadow-yellow-500/20 active:scale-95 transition-all">
            CRÉER MON COMPTE
          </button>
          <div className="flex items-center justify-center gap-2 text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
            <Shield size={12} /> Sécurisé par Guisoga Core
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* HEADER */}
      <header className="px-4 py-4 flex justify-between items-center bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-800 sticky top-0 z-50">
        <h1 className="text-2xl font-black text-yellow-500 italic tracking-tighter">GUISOGA</h1>
        <div className="flex gap-4">
          <Search size={22} className="text-zinc-400" />
          <div className="relative" onClick={() => setActiveTab("messenger")}>
            <MessageCircle size={22} className={activeTab === "messenger" ? "text-yellow-500" : "text-zinc-400"} />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full" />
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        {activeTab === "home" && (
          <>
            {/* STORIES */}
            <div className="flex gap-3 p-4 bg-black overflow-x-auto scrollbar-hide">
              <div className="min-w-[100px] h-40 bg-zinc-900 rounded-2xl border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center cursor-pointer hover:border-yellow-500 transition-colors" onClick={handlePublish}>
                <Plus className="text-yellow-500" />
                <span className="text-[9px] font-black mt-2 uppercase tracking-tighter">Ma Story</span>
              </div>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="min-w-[100px] h-40 bg-zinc-800 rounded-2xl relative overflow-hidden border border-zinc-800 shadow-xl">
                   <img src={`https://picsum.photos/200/400?random=${i+10}`} className="w-full h-full object-cover opacity-50" />
                   <div className="absolute top-2 left-2 w-8 h-8 rounded-full border-2 border-yellow-500 bg-black" />
                </div>
              ))}
            </div>

            {/* BARRE DE PUBLICATION */}
            <div className="mx-4 p-4 bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-black">J</div>
              <button onClick={handlePublish} className="flex-1 text-left text-zinc-500 text-sm font-medium">Quoi de neuf Joseph ?</button>
              <ImageIcon className="text-green-500" size={20} />
            </div>

            {/* FLUX DE POSTS */}
            {posts.map(post => (
              <div key={post.id} className="bg-zinc-900/50 mb-3 border-y border-zinc-800 pb-4 animate-in fade-in slide-in-from-bottom-2">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-yellow-500" />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-black uppercase tracking-widest">{post.author}</span>
                        <CheckCircle size={10} className="text-blue-500 fill-blue-500" />
                      </div>
                      <p className="text-[8px] text-zinc-500 font-bold">{post.timestamp}</p>
                    </div>
                  </div>
                  <MoreVertical size={16} className="text-zinc-600" />
                </div>
                <p className="px-4 pb-4 text-sm leading-relaxed text-zinc-300 font-medium">{post.content}</p>
                
                {/* ACTIONS */}
                <div className="px-4 py-3 flex justify-between border-t border-zinc-800/50">
                  <div className="flex gap-10">
                    <button className="flex items-center gap-2 group">
                       <Heart size={22} className="group-hover:text-red-500 group-hover:fill-red-500 transition-all" /> 
                       <span className="text-xs font-bold">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 group">
                       <MessageSquare size={22} className="group-hover:text-yellow-500 transition-all" /> 
                       <span className="text-xs font-bold">{post.comments?.length || 0}</span>
                    </button>
                  </div>
                  <Share2 size={22} className="text-zinc-600 hover:text-white" />
                </div>

                {/* COMMENTAIRES RÉELS */}
                <div className="px-4 mt-2 space-y-2">
                  {post.comments?.map((c: any, i: number) => (
                    <div key={i} className="flex gap-2 animate-in slide-in-from-left-1">
                      <div className="bg-zinc-800/80 px-3 py-2 rounded-2xl text-[11px] border border-zinc-700">
                        <span className="font-black text-yellow-500 uppercase mr-1">{c.user}</span> {c.text}
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-2 mt-4">
                    <input 
                      value={newComment[post.id] || ""} 
                      onChange={(e) => setNewComment({...newComment, [post.id]: e.target.value})}
                      className="flex-1 bg-black border border-zinc-800 rounded-full px-4 py-2 text-[11px] outline-none focus:border-yellow-500" 
                      placeholder="Ajouter un commentaire GUISOGA..." 
                    />
                    <button onClick={() => addComment(post.id)} className="text-yellow-500 font-black text-[10px] uppercase px-2">Publier</button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* MESSENGER */}
        {activeTab === "messenger" && (
          <div className="h-full bg-black animate-in slide-in-from-right duration-300">
             <div className="p-4 flex items-center gap-4 border-b border-zinc-800">
                <ChevronLeft onClick={() => setActiveTab("home")} className="text-yellow-500 cursor-pointer" />
                <h2 className="text-lg font-black uppercase tracking-tighter italic">Guisoga Chat</h2>
             </div>
             {!selectedChat ? (
               <div className="p-4 space-y-3">
                 {["Conseil Empire", "Direction Technique", "Membres Premium"].map(chat => (
                   <div key={chat} onClick={() => setSelectedChat(chat)} className="flex items-center gap-4 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 hover:border-yellow-500/50 transition-all cursor-pointer">
                      <div className="w-12 h-12 rounded-full bg-zinc-800 border-2 border-yellow-500" />
                      <div className="flex-1">
                        <p className="text-sm font-black uppercase">{chat}</p>
                        <p className="text-[10px] text-zinc-500 italic italic">Nouveau message reçu</p>
                      </div>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="flex flex-col h-full bg-zinc-950">
                  <div className="p-4 bg-zinc-900 flex justify-between items-center border-b border-zinc-800">
                    <span className="font-black text-yellow-500 uppercase text-xs">{selectedChat}</span>
                    <X onClick={() => setSelectedChat(null)} className="text-zinc-500 cursor-pointer" />
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-end gap-3 overflow-y-auto">
                    <div className="bg-zinc-800 p-3 rounded-2xl rounded-bl-none max-w-[80%] text-[11px] shadow-lg">L'accès est accordé. Quel est votre ordre ?</div>
                    <div className="bg-yellow-500 text-black font-bold p-3 rounded-2xl rounded-br-none max-w-[80%] self-end text-[11px] shadow-lg">Tout est prêt. Lancez l'Empire.</div>
                  </div>
                  <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex gap-3">
                    <input className="flex-1 bg-black border border-zinc-800 rounded-full px-4 py-3 text-[11px] outline-none" placeholder="Votre message..." />
                    <div className="p-3 bg-yellow-500 rounded-full text-black"><Send size={18} /></div>
                  </div>
               </div>
             )}
          </div>
        )}
      </div>

      {/* NAV BARRE BASSE */}
      <nav className="fixed bottom-0 w-full bg-zinc-900/90 backdrop-blur-xl border-t border-zinc-800 flex justify-around p-4 z-[100]">
        <Home className={activeTab === "home" ? "text-yellow-500" : "text-zinc-500"} onClick={() => setActiveTab("home")} />
        <Zap className={activeTab === "market" ? "text-yellow-500" : "text-zinc-500"} onClick={() => setActiveTab("market")} />
        <div className="bg-white text-black rounded-xl p-1 shadow-2xl active:scale-90 transition-all cursor-pointer" onClick={handlePublish}>
          <Plus size={28} />
        </div>
        <Video className={activeTab === "video" ? "text-yellow-500" : "text-zinc-500"} onClick={() => setActiveTab("video")} />
        <Menu className={activeTab === "menu" ? "text-yellow-500" : "text-zinc-500"} onClick={() => setActiveTab("menu")} />
      </nav>
    </main>
  );
}