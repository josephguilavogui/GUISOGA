"use client";
import { useState, useEffect } from "react";
import { 
  Home, Tv, MessageCircle, Users, Heart, Search, 
  Share2, Send, X, Play, ShieldCheck, Plus, Radio, ChevronLeft
} from "lucide-react";

export default function GuisogaUltimate() {
  const [activeTab, setActiveTab] = useState("home");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Bienvenue sur votre plateforme privée.", isMe: false },
    { id: 2, text: "Tout est prêt pour vos Lives.", isMe: false }
  ]);
  const [inputValue, setInputValue] = useState("");

  // Flux Vidéos (Style TikTok/Reels)
  const feedVideos = [
    { id: "p68mMDBQRyA", user: "Zee Magic", title: "Bollywood Live" },
    { id: "4YzrzUc8TAA", user: "Guisoga TV", title: "Direct Spécial" },
    { id: "jfKfPfyJRdk", user: "Music Pro", title: "Ambiance Empire" }
  ];

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { id: Date.now(), text: inputValue, isMe: true }]);
      setInputValue("");
    }
  };

  return (
    <main className="h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      
      {/* BARRE SUPÉRIEURE ÉPURÉE */}
      <nav className="p-4 flex justify-between items-center bg-black border-b border-zinc-900 z-50">
        <h1 className="text-2xl font-black text-yellow-500 italic tracking-tighter">GUISOGA</h1>
        <div className="flex gap-5 items-center">
          <Search size={22} className="text-zinc-400" />
          <div className="relative cursor-pointer" onClick={() => setActiveTab("chat")}>
            <MessageCircle size={22} className={activeTab === "chat" ? "text-yellow-500" : "text-zinc-400"} />
            <span className="absolute -top-1 -right-1 bg-red-600 w-2 h-2 rounded-full"></span>
          </div>
        </div>
      </nav>

      {/* CONTENU PRINCIPAL */}
      <div className="flex-1 overflow-y-auto">
        
        {/* --- MODE FACEBOOK (Accueil + Stories) --- */}
        {activeTab === "home" && (
          <section className="animate-in fade-in pb-20">
            {/* Stories Style Facebook */}
            <div className="flex gap-3 p-4 overflow-x-auto scrollbar-hide bg-zinc-950">
              <div className="min-w-[100px] h-40 bg-zinc-900 rounded-2xl border border-zinc-800 flex flex-col items-center justify-center relative overflow-hidden">
                <Plus size={30} className="text-yellow-500 mb-2" />
                <span className="text-[10px] font-bold">CRÉER STORY</span>
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="min-w-[100px] h-40 bg-zinc-800 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-2 left-2 w-8 h-8 rounded-full border-2 border-yellow-500 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} className="object-cover" />
                  </div>
                  <img src={`https://picsum.photos/200/300?random=${i}`} className="w-full h-full object-cover opacity-60" />
                </div>
              ))}
            </div>

            {/* Bouton S'abonner Simple */}
            <div className="m-4 p-4 bg-zinc-900 rounded-2xl border border-yellow-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-yellow-500" size={20} />
                <span className="text-xs font-black uppercase">Accès Privé</span>
              </div>
              <button 
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black transition-all ${
                  isSubscribed ? "bg-zinc-800 text-gray-500" : "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20"
                }`}
              >
                {isSubscribed ? "ABONNÉ ✓" : "S'ABONNER"}
              </button>
            </div>

            {/* Posts Classiques */}
            {[0, 1].map((idx) => (
              <div key={idx} className="mb-6 border-b border-zinc-900 pb-4">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-black">G</div>
                  <div>
                    <p className="text-xs font-black">GUISOGA OFFICIEL</p>
                    <p className="text-[8px] text-zinc-500 uppercase">À l'instant</p>
                  </div>
                </div>
                <div className="aspect-video bg-zinc-900 cursor-pointer" onClick={() => setActiveTab("video")}>
                   <iframe className="w-full h-full pointer-events-none" src={`https://www.youtube.com/embed/${feedVideos[idx].id}?controls=0&mute=1`} />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* --- MODE TIKTOK (Scroll Vidéo Vertical) --- */}
        {activeTab === "video" && (
          <div className="h-[calc(100vh-140px)] overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-black">
            {feedVideos.map((vid, idx) => (
              <section key={idx} className="h-full w-full snap-start relative">
                <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${vid.id}?autoplay=1&controls=0&loop=1&playlist=${vid.id}`} />
                <div className="absolute right-4 bottom-20 flex flex-col gap-6">
                  <Heart size={30} className="hover:text-red-500" />
                  <MessageCircle size={30} onClick={() => setActiveTab("chat")} />
                  <Share2 size={30} />
                </div>
                <div className="absolute left-4 bottom-10">
                  <p className="font-black text-sm">@{vid.user}</p>
                  <p className="text-xs text-zinc-300">{vid.title}</p>
                </div>
              </section>
            ))}
          </div>
        )}

        {/* --- MESSAGERIE (Messenger) --- */}
        {activeTab === "chat" && (
          <section className="flex flex-col h-[calc(100vh-140px)] p-4 animate-in slide-in-from-right">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`p-4 rounded-2xl max-w-[80%] ${m.isMe ? "bg-yellow-500 text-black font-bold" : "bg-zinc-900 text-white border border-zinc-800"}`}>
                    <p className="text-sm">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 bg-zinc-900 p-2 rounded-2xl border border-zinc-800">
              <input 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Écrire à Joseph..." 
                className="flex-1 bg-transparent px-4 outline-none text-sm" 
              />
              <button onClick={handleSendMessage} className="bg-yellow-500 p-3 rounded-xl text-black">
                <Send size={18} />
              </button>
            </div>
          </section>
        )}

        {/* --- MODE LIVE (TikTok Live) --- */}
        {activeTab === "live" && (
          <section className="h-full flex flex-col items-center justify-center bg-zinc-950 p-6 text-center animate-in zoom-in">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-6 animate-pulse shadow-[0_0_30px_rgba(220,38,38,0.3)]">
              <Radio size={40} />
            </div>
            <h2 className="text-2xl font-black uppercase italic italic mb-2">Lancer un Live</h2>
            <p className="text-xs text-zinc-500 mb-8 max-w-[200px]">Diffusez en direct pour vos abonnés Guisoga.</p>
            <button className="bg-white text-black font-black px-12 py-4 rounded-full uppercase text-xs tracking-widest hover:bg-yellow-500">
              DÉMARRER LE DIRECT
            </button>
          </section>
        )}
      </div>

      {/* NAVIGATION BASSE (Fixe) */}
      <nav className="bg-black border-t border-zinc-900 px-8 py-4 flex justify-between items-center z-[100]">
        <Home className={activeTab === "home" ? "text-yellow-500 scale-125" : "text-zinc-600"} onClick={() => setActiveTab("home")} />
        <Tv className={activeTab === "video" ? "text-yellow-500 scale-125" : "text-zinc-600"} onClick={() => setActiveTab("video")} />
        <div className="w-12 h-8 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700" onClick={() => setActiveTab("live")}>
          <Plus size={20} className="text-white" />
        </div>
        <Users className={activeTab === "users" ? "text-yellow-500 scale-125" : "text-zinc-600"} onClick={() => setActiveTab("home")} />
        <div onClick={() => setActiveTab("home")} className="w-8 h-8 rounded-full border-2 border-zinc-800 overflow-hidden">
          <img src="/icon-512.png" className="w-full h-full object-cover" />
        </div>
      </nav>
    </main>
  );
}