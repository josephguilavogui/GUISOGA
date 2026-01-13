"use client";
import { useState, useEffect } from "react";
import { 
  Home, Tv, MessageCircle, Users, Heart, PlusSquare, 
  Search, Share2, ChevronLeft, Send, X, Play
} from "lucide-react";

export default function GuisogaSuperApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [messages, setMessages] = useState([
    { id: 1, sender: "Joseph Guilavogui", text: "Bienvenue. Regardez nos flux exclusifs.", isMe: false }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  
  // Système de gestion des chaînes vidéo
  const channels = [
    { id: "jfKfPfyJRdk", name: "Lofi Live", desc: "Détente & Focus" },
    { id: "21X5lGlDOfg", name: "NASA Live", desc: "Espace en Direct" },
    { id: "9u_6Trc_vlo", name: "World News", desc: "Infos Mondiales" }
  ];
  const [currentVideo, setCurrentVideo] = useState(channels[0].id);

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { id: Date.now(), sender: "Moi", text: inputValue, isMe: true }]);
      setInputValue("");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans pb-24 overflow-x-hidden">
      
      {/* BARRE SUPÉRIEURE */}
      <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {activeTab !== "home" && (
            <button onClick={() => setActiveTab("home")} className="p-1 hover:bg-zinc-800 rounded-full">
              <ChevronLeft className="text-yellow-500" size={28} />
            </button>
          )}
          <h1 className="text-2xl font-black text-yellow-500 tracking-tighter cursor-pointer" onClick={() => setActiveTab("home")}>
            GUISOGA
          </h1>
        </div>
        <div className="flex gap-4">
          <Search className="text-gray-400 cursor-pointer" />
          <div className="relative cursor-pointer" onClick={() => {setActiveTab("chat"); setShowBubble(false)}}>
            <MessageCircle className={activeTab === "chat" ? "text-yellow-500" : "text-gray-400"} />
            {showBubble && <span className="absolute -top-1 -right-1 bg-red-600 w-2 h-2 rounded-full animate-ping"></span>}
          </div>
        </div>
      </nav>

      {/* BULLE MESSENGER */}
      {showBubble && (
        <div className="fixed top-20 right-4 z-[100] animate-in slide-in-from-right">
          <div className="bg-yellow-500 text-black p-3 rounded-2xl rounded-tr-none shadow-2xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
              <img src="/icon-192.png" alt="JG" className="w-6 h-6 rounded-full" />
            </div>
            <div onClick={() => {setActiveTab("chat"); setShowBubble(false)}} className="cursor-pointer">
              <p className="text-[10px] font-black uppercase tracking-tighter">Joseph Guilavogui</p>
              <p className="text-[11px] font-medium">Nouveau live disponible !</p>
            </div>
            <X size={14} className="cursor-pointer" onClick={() => setShowBubble(false)} />
          </div>
        </div>
      )}

      {/* CONTENU DYNAMIQUE */}
      <div className="w-full">
        
        {/* --- ACCUEIL --- */}
        {activeTab === "home" && (
          <section className="animate-in fade-in p-4">
             <div className="bg-zinc-900/50 p-6 rounded-[2.5rem] border border-yellow-500/20 mb-6">
                <p className="text-yellow-500 font-black text-xs uppercase tracking-widest mb-2">Joseph Guilavogui</p>
                <h2 className="text-2xl font-black leading-tight">L'empire de l'excellence mondiale.</h2>
             </div>
             <button onClick={() => setActiveTab("video")} className="w-full bg-yellow-500 text-black font-black py-4 rounded-2xl uppercase text-xs tracking-widest active:scale-95 transition-transform">
                Accéder au Direct
             </button>
          </section>
        )}

        {/* --- TV MODE (MULTI-CHAÎNES) --- */}
        {activeTab === "video" && (
          <section className="animate-in zoom-in">
            <div className="relative aspect-video w-full bg-black">
              <iframe 
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1&mute=0&controls=1`} 
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div> EN DIRECT
              </div>
            </div>

            {/* Liste des Chaînes Disponibles */}
            <div className="p-4 space-y-3">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Chaînes Disponibles</p>
              <div className="grid grid-cols-1 gap-2">
                {channels.map((ch) => (
                  <div 
                    key={ch.id}
                    onClick={() => setCurrentVideo(ch.id)}
                    className={`flex items-center gap-4 p-4 rounded-3xl border transition-all cursor-pointer ${
                      currentVideo === ch.id ? "bg-yellow-500 text-black border-yellow-500" : "bg-zinc-900 border-white/5 text-white"
                    }`}
                  >
                    <div className={`p-2 rounded-xl ${currentVideo === ch.id ? "bg-black/10" : "bg-yellow-500/10"}`}>
                      <Play size={20} fill={currentVideo === ch.id ? "black" : "none"} />
                    </div>
                    <div>
                      <p className="font-black text-sm uppercase tracking-tighter">{ch.name}</p>
                      <p className={`text-[10px] ${currentVideo === ch.id ? "text-black/60" : "text-gray-500"}`}>{ch.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* --- MESSAGERIE --- */}
        {activeTab === "chat" && (
          <section className="flex flex-col h-[75vh] p-4 animate-in slide-in-from-right">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-4 rounded-[2rem] ${m.isMe ? "bg-yellow-500 text-black rounded-tr-none" : "bg-zinc-900 text-white rounded-tl-none border border-white/5"}`}>
                    <p className="text-sm font-medium leading-relaxed">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 bg-zinc-900 p-2 rounded-3xl border border-white/10">
              <input 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Votre message éminent..." 
                className="flex-1 bg-transparent px-5 py-3 text-sm outline-none"
              />
              <button onClick={handleSendMessage} className="bg-yellow-500 p-4 rounded-2xl text-black active:scale-90 transition-all">
                <Send size={20} strokeWidth={3} />
              </button>
            </div>
          </section>
        )}

      </div>

      {/* NAVIGATION BASSE */}
      <nav className="fixed bottom-0 w-full bg-black/95 backdrop-blur-xl border-t border-zinc-900 px-10 py-5 flex justify-between items-center z-50">
        <Home className={`cursor-pointer ${activeTab === "home" ? "text-yellow-500 scale-125" : "text-zinc-700"}`} onClick={() => setActiveTab("home")} />
        <Tv className={`cursor-pointer ${activeTab === "video" ? "text-yellow-500 scale-125" : "text-zinc-700"}`} onClick={() => setActiveTab("video")} />
        <Users className={`cursor-pointer ${activeTab === "dating" ? "text-yellow-500 scale-125" : "text-zinc-700"}`} onClick={() => setActiveTab("dating")} />
        <div onClick={() => setActiveTab("home")} className={`w-8 h-8 rounded-full border-2 ${activeTab === "home" ? "border-yellow-500" : "border-zinc-800"}`}>
          <img src="/icon-512.png" className="w-full h-full rounded-full object-cover" />
        </div>
      </nav>
    </main>
  );
}