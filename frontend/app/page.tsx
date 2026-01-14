"use client";
import { useState, useRef, useEffect } from "react";
import { 
  Home, Tv, MessageCircle, Heart, Search, Share2, Send, Plus, 
  Users, ChevronLeft, Volume2, VolumeX, MessageSquare, ShieldCheck, 
  Globe, Star, MoreHorizontal, Bookmark, CheckCircle
} from "lucide-react";

export default function GuisogaNativeApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [isMuted, setIsMuted] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const [comments, setComments] = useState<{ [key: string]: string[] }>({});
  const [commentInput, setCommentInput] = useState("");
  const [hasMounted, setHasMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setHasMounted(true); }, []);

  const feed = [
    { id: "SKfHpHnr5WY", user: "Guisoga Studio", title: "Film Action 2026", sub: "1.2M", likes: "45K" },
    { id: "gcpq4wDm9gM", user: "Africa News", title: "Direct Info", sub: "500K", likes: "12K" },
    { id: "RCgjYlZ34jw", user: "Urban Hit", title: "Naza - Nouveau Clip", sub: "2M", likes: "150K" }
  ];

  if (!hasMounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/*" />

      {/* HEADER NATIVE AVEC BOUTON RETOUR */}
      <nav className="p-4 flex justify-between items-center bg-black border-b border-zinc-900 z-50">
        <div className="flex items-center gap-3">
          {activeTab !== "home" && (
            <button onClick={() => setActiveTab("home")} className="p-2 bg-zinc-900 rounded-full text-yellow-500">
              <ChevronLeft size={20} />
            </button>
          )}
          <h1 className="text-xl font-black text-yellow-500 tracking-tighter">GUISOGA</h1>
        </div>
        <div className="flex gap-4">
           <button onClick={() => setIsMuted(!isMuted)} className="text-zinc-400">
              {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} className="text-green-500" />}
           </button>
           <Search size={22} />
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto bg-black">
        
        {/* --- INTERFACE ACCUEIL (Style Social Pro) --- */}
        {activeTab === "home" && (
          <section className="pb-24">
            {/* STORIES */}
            <div className="flex gap-4 p-4 overflow-x-auto scrollbar-hide border-b border-zinc-900">
              <div className="flex flex-col items-center gap-1" onClick={() => fileInputRef.current?.click()}>
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-zinc-700 flex items-center justify-center bg-zinc-900">
                  <Plus size={20} className="text-yellow-500" />
                </div>
                <span className="text-[9px] font-bold text-zinc-500 uppercase">Poster</span>
              </div>
              {feed.map((f, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 rounded-full border-2 border-yellow-500 p-0.5">
                    <img src={`https://i.pravatar.cc/100?u=${f.id}`} className="w-full h-full rounded-full object-cover" />
                  </div>
                  <span className="text-[9px] font-medium truncate w-14 text-center uppercase">VIP {i+1}</span>
                </div>
              ))}
            </div>

            {/* PUBLICATIONS NATIVES */}
            {feed.map((post) => (
              <div key={post.id} className="mb-8 border-b border-zinc-900">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-yellow-500 text-black font-black flex items-center justify-center text-xs">G</div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-black uppercase tracking-widest">{post.user}</span>
                        <CheckCircle size={12} className="text-blue-500" fill="currentColor" />
                      </div>
                      <p className="text-[10px] text-zinc-500">{post.sub} abonnés</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsSubscribed(!isSubscribed)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase transition-all ${isSubscribed ? "bg-zinc-800 text-zinc-500" : "bg-white text-black"}`}
                  >
                    {isSubscribed ? "Abonné" : "S'abonner"}
                  </button>
                </div>

                {/* Lecteur Video Interne */}
                <div className="aspect-video w-full bg-zinc-900 relative">
                  <iframe 
                    className="w-full h-full pointer-events-none" 
                    src={`https://www.youtube.com/embed/${post.id}?controls=0&modestbranding=1&rel=0&iv_load_policy=3&mute=${isMuted ? 1 : 0}`}
                  />
                  <div className="absolute inset-0 bg-transparent" /> {/* Bloque les clics vers YouTube */}
                </div>

                {/* Interactions Directes */}
                <div className="p-4">
                  <div className="flex gap-6 mb-4">
                    <button onClick={() => setLikes(p => ({...p, [post.id]: !p[post.id]}))}>
                      <Heart size={26} className={likes[post.id] ? "text-red-600 fill-red-600" : "text-white"} />
                    </button>
                    <button onClick={() => setActiveTab(`comment-${post.id}`)}>
                      <MessageSquare size={26} />
                    </button>
                    <button className="ml-auto">
                      <Share2 size={26} />
                    </button>
                  </div>
                  <p className="text-xs font-black mb-1">{post.likes} J'aime</p>
                  <p className="text-xs"><span className="font-bold mr-2 uppercase">{post.user}</span>{post.title}</p>
                  
                  {/* Zone de commentaires native */}
                  <div className="mt-4 flex gap-2">
                    <input 
                      className="flex-1 bg-zinc-900 text-xs px-4 py-2 rounded-lg border border-zinc-800"
                      placeholder="Ajouter un commentaire..."
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                    />
                    <button onClick={() => {
                      if(commentInput) {
                        setComments(p => ({...p, [post.id]: [...(p[post.id] || []), commentInput]}));
                        setCommentInput("");
                      }
                    }} className="text-yellow-500"><Send size={20} /></button>
                  </div>
                  <div className="mt-2">
                    {(comments[post.id] || []).map((c, i) => (
                      <p key={i} className="text-[10px] text-zinc-400 mt-1 bg-zinc-900/50 p-2 rounded">
                        <span className="text-yellow-500 font-bold">Vous:</span> {c}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* --- RENCONTRE (TINDER PRO) --- */}
        {activeTab === "match" && (
          <section className="p-4 h-full animate-in slide-in-from-right">
            <h2 className="text-xl font-black uppercase italic mb-6 text-yellow-500 flex items-center gap-2">
              <Globe /> Empire Connect
            </h2>
            <div className="relative h-[450px] bg-zinc-900 rounded-[2.5rem] border border-zinc-800 overflow-hidden shadow-2xl">
              <img src="https://i.pravatar.cc/500?u=global" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black via-black/60 to-transparent">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-3xl font-black">Sarah, 25</h3>
                  <div className="bg-yellow-500 text-black px-2 py-1 rounded text-[10px] font-black">CONFiance 100%</div>
                </div>
                <p className="text-sm text-zinc-300 italic mb-6">"Cherche partenaire sérieux pour projet mondial."</p>
                <div className="flex gap-4">
                  <button className="flex-1 bg-white text-black py-4 rounded-2xl font-black uppercase text-xs">Liker</button>
                  <button className="flex-1 bg-zinc-800 py-4 rounded-2xl font-black uppercase text-xs">Suivant</button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* NAVIGATION BASSE (Native) */}
      <nav className="bg-black border-t border-zinc-900 px-8 py-5 flex justify-between items-center z-[100]">
        <Home className={activeTab === "home" ? "text-yellow-500 scale-125" : "text-zinc-600"} onClick={() => setActiveTab("home")} />
        <Tv className={activeTab === "video" ? "text-yellow-500 scale-125" : "text-zinc-600"} onClick={() => setActiveTab("video")} />
        <div onClick={() => fileInputRef.current?.click()} className="w-12 h-10 bg-white rounded-xl flex items-center justify-center border-b-4 border-yellow-500 active:scale-95 transition-all">
          <Plus size={24} className="text-black" />
        </div>
        <Globe className={activeTab === "match" ? "text-yellow-500 scale-125" : "text-zinc-600"} onClick={() => setActiveTab("match")} />
        <div onClick={() => setActiveTab("home")} className="w-9 h-9 rounded-full border-2 border-zinc-800 overflow-hidden">
          <img src="/icon-512.png" className="w-full h-full object-cover" alt="Profile" />
        </div>
      </nav>
    </main>
  );
}