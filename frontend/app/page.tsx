"use client";
import { useState, useRef, useEffect } from "react";
import { 
  Home, Tv, MessageCircle, Heart, Search, 
  Share2, Send, Plus, Radio, Camera, Users, ChevronLeft, Volume2, VolumeX, MessageSquare, ShieldCheck, Globe, Star, MoreHorizontal, Bookmark
} from "lucide-react";

export default function GuisogaSuperApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [isMuted, setIsMuted] = useState(true);
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const [hasMounted, setHasMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setHasMounted(true); }, []);

  // CONTENU MULTI-PLATEFORME
  const feedContent = [
    { id: "SKfHpHnr5WY", user: "Guisoga_Studio", type: "reels", title: "Action Cinema 2026", likes: "24K" },
    { id: "gcpq4wDm9gM", user: "Afro_Vibes", type: "post", title: "Nouveau Hit de l'été", likes: "12K" },
    { id: "RCgjYlZ34jw", user: "Naza_Officiel", type: "reels", title: "Session Studio", likes: "89K" },
    { id: "dqt14eKqtac", user: "Humour_Empire", type: "post", title: "Compilation Fails", likes: "5K" }
  ];

  const matches = [
    { id: 101, name: "Sofia", age: 24, country: "Espagne", bio: "Artiste & Voyageuse", trust: 99 },
    { id: 102, name: "Liam", age: 28, country: "Canada", bio: "Développeur, fan de sport", trust: 94 }
  ];

  const toggleLike = (id: string) => {
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (!hasMounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/*" />

      {/* HEADER TYPE INSTAGRAM / FACEBOOK */}
      <nav className="p-4 flex justify-between items-center bg-black border-b border-zinc-900 z-50">
        <h1 className="text-2xl font-black text-yellow-500 italic tracking-tighter">GUISOGA</h1>
        <div className="flex gap-4 items-center">
          <button onClick={() => setIsMuted(!isMuted)} className="p-1.5 bg-zinc-900 rounded-lg border border-zinc-800">
            {isMuted ? <VolumeX size={18} className="text-red-500" /> : <Volume2 size={18} className="text-yellow-500" />}
          </button>
          <Search size={24} />
          <div className="relative" onClick={() => setActiveTab("chat")}>
            <MessageCircle size={24} className={activeTab === "chat" ? "text-yellow-500" : ""} />
            <span className="absolute -top-1 -right-1 bg-red-600 w-2 h-2 rounded-full"></span>
          </div>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto">
        
        {/* --- MODE ACCUEIL (INSTAGRAM + FACEBOOK) --- */}
        {activeTab === "home" && (
          <section className="animate-in fade-in pb-20">
            {/* STORIES (Instagram Style) */}
            <div className="flex gap-4 p-4 overflow-x-auto scrollbar-hide border-b border-zinc-900">
              <div className="flex flex-col items-center gap-1" onClick={() => fileInputRef.current?.click()}>
                <div className="w-16 h-16 rounded-full border-2 border-zinc-800 p-1 flex items-center justify-center bg-zinc-900">
                  <Plus size={24} className="text-yellow-500" />
                </div>
                <span className="text-[10px] font-medium text-zinc-500 uppercase">Votre Story</span>
              </div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-16 h-16 rounded-full border-2 border-yellow-500 p-1">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-full h-full rounded-full object-cover" />
                  </div>
                  <span className="text-[10px] font-medium uppercase">Membre {i}</span>
                </div>
              ))}
            </div>

            {/* FEED (Facebook/Instagram Style) */}
            {feedContent.filter(c => c.type === "post").map((post) => (
              <div key={post.id} className="mb-4 bg-black">
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-500 text-black font-black flex items-center justify-center text-[10px]">G</div>
                    <span className="text-xs font-black uppercase tracking-widest">{post.user}</span>
                  </div>
                  <MoreHorizontal size={18} />
                </div>
                <div className="aspect-square bg-zinc-900">
                  <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${post.id}?mute=${isMuted ? 1 : 0}`} />
                </div>
                <div className="p-3">
                  <div className="flex gap-5 mb-2">
                    <Heart 
                      size={26} 
                      onClick={() => toggleLike(post.id)} 
                      className={likes[post.id] ? "text-red-500 fill-red-500" : ""} 
                    />
                    <MessageSquare size={26} />
                    <Share2 size={26} />
                    <Bookmark size={26} className="ml-auto" />
                  </div>
                  <p className="text-xs font-black">{post.likes} J'aime</p>
                  <p className="text-xs mt-1"><span className="font-bold mr-2">{post.user}</span>{post.title}</p>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* --- MODE REELS (TIKTOK STYLE) --- */}
        {activeTab === "video" && (
          <div className="h-[calc(100vh-140px)] overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
            {feedContent.map((vid, idx) => (
              <section key={idx} className="h-full w-full snap-start relative">
                <iframe 
                  className="w-full h-full object-cover" 
                  src={`https://www.youtube.com/embed/${vid.id}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${vid.id}&controls=0`} 
                  allow="autoplay"
                />
                <div className="absolute right-4 bottom-24 flex flex-col gap-6 items-center z-30">
                  <div className="flex flex-col items-center">
                    <div className="bg-zinc-900/60 p-3 rounded-full backdrop-blur-md" onClick={() => toggleLike(vid.id)}>
                      <Heart size={30} className={likes[vid.id] ? "text-red-500 fill-red-500" : "text-white"} />
                    </div>
                    <span className="text-[10px] font-bold mt-1">12.5K</span>
                  </div>
                  <div className="bg-zinc-900/60 p-3 rounded-full backdrop-blur-md">
                    <MessageCircle size={30} />
                  </div>
                  <div className="bg-zinc-900/60 p-3 rounded-full backdrop-blur-md" onClick={() => {if(navigator.share) navigator.share({url: window.location.href})}}>
                    <Share2 size={30} />
                  </div>
                </div>
                <div className="absolute left-4 bottom-10 z-30">
                  <p className="font-black text-sm uppercase">@{vid.user} ✓</p>
                  <p className="text-xs text-white/80">{vid.title}</p>
                </div>
              </section>
            ))}
          </div>
        )}

        {/* --- MODE RENCONTRE (TINDER STYLE) --- */}
        {activeTab === "match" && (
          <section className="p-4 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="text-yellow-500" size={20} />
              <h2 className="text-lg font-black uppercase italic tracking-tighter">Empire Match</h2>
            </div>
            <div className="flex-1 relative">
              {matches.map((p) => (
                <div key={p.id} className="absolute inset-0 bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-800 shadow-2xl animate-in slide-in-from-right">
                  <img src={`https://i.pravatar.cc/400?u=${p.id}`} className="w-full h-[65%] object-cover" />
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-2xl font-black">{p.name}, {p.age}</h3>
                      <div className="bg-yellow-500/10 border border-yellow-500 px-2 py-1 rounded-md flex items-center gap-1">
                        <ShieldCheck size={12} className="text-yellow-500" />
                        <span className="text-[10px] text-yellow-500 font-bold">{p.trust}%</span>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400 font-bold uppercase mb-2">{p.country}</p>
                    <p className="text-sm italic text-zinc-300">"{p.bio}"</p>
                    <div className="flex gap-4 mt-8">
                      <button className="flex-1 bg-zinc-800 py-4 rounded-2xl font-black uppercase text-[10px] border border-zinc-700">Passer</button>
                      <button className="flex-1 bg-yellow-500 text-black py-4 rounded-2xl font-black uppercase text-[10px]">Liker</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* NAVIGATION BASSE (Facebook/Instagram/TikTok Mix) */}
      <nav className="bg-black border-t border-zinc-900 px-8 py-5 flex justify-between items-center z-[100]">
        <Home className={activeTab === "home" ? "text-yellow-500 scale-125" : "text-zinc-600"} onClick={() => setActiveTab("home")} />
        <Tv className={activeTab === "video" ? "text-yellow-500 scale-125" : "text-zinc-600"} onClick={() => setActiveTab("video")} />
        <div onClick={() => fileInputRef.current?.click()} className="w-12 h-10 bg-white rounded-xl flex items-center justify-center border-b-4 border-yellow-500 active:translate-y-1 transition-all">
          <Plus size={24} className="text-black" />
        </div>
        <Globe className={activeTab === "match" ? "text-yellow-500 scale-125" : "text-zinc-600"} onClick={() => setActiveTab("match")} />
        <div onClick={() => setActiveTab("home")} className="w-8 h-8 rounded-full border-2 border-zinc-800 overflow-hidden">
          <img src="/icon-512.png" className="w-full h-full object-cover" />
        </div>
      </nav>
    </main>
  );
}