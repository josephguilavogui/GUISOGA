"use client";
import { useState, useEffect } from "react";
import { 
  Home, Tv, MessageCircle, Users, Heart, PlusSquare, 
  Search, Share2, ChevronLeft, Send, X, Play, Globe, ShieldCheck
} from "lucide-react";

export default function GuisogaEmpireTotal() {
  const [activeTab, setActiveTab] = useState("home");
  const [subs, setSubs] = useState(1250);
  const [messages, setMessages] = useState([
    { id: 1, sender: "Joseph Guilavogui", text: "Bienvenue dans l'empire. Tout est prêt.", isMe: false }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showBubble, setShowBubble] = useState(false);

  // Vidéos fonctionnelles (Flux Live réels)
  const channels = [
    { id: "jfKfPfyJRdk", name: "Flux 1: Détente", desc: "Live 24/7" },
    { id: "5_X_GZp8aLw", name: "Flux 2: Nature", desc: "Direct Premium" },
    { id: "9u_6Trc_vlo", name: "Flux 3: News", desc: "Actualités Mondiales" }
  ];
  const [currentVid, setCurrentVid] = useState(channels[0].id);

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
    <main className="min-h-screen bg-[#050505] text-white font-sans pb-24">
      
      {/* BARRE SUPÉRIEURE DYNAMIQUE */}
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {activeTab !== "home" && (
            <button onClick={() => setActiveTab("home")} className="p-1 hover:bg-zinc-800 rounded-full">
              <ChevronLeft className="text-yellow-500" size={28} />
            </button>
          )}
          <h1 className="text-2xl font-black text-yellow-500 tracking-tighter italic">GUISOGA</h1>
        </div>
        <div className="flex gap-4 items-center">
          <Search className="text-gray-400 cursor-pointer" />
          <div className="relative cursor-pointer" onClick={() => {setActiveTab("chat"); setShowBubble(false)}}>
            <MessageCircle className={activeTab === "chat" ? "text-yellow-500" : "text-gray-400"} />
            {showBubble && <span className="absolute -top-1 -right-1 bg-red-600 w-2 h-2 rounded-full animate-ping"></span>}
          </div>
        </div>
      </nav>

      {/* BULLE MESSENGER (Apparaît après 5s) */}
      {showBubble && (
        <div className="fixed top-20 right-4 z-[100] animate-bounce">
          <div className="bg-yellow-500 text-black p-3 rounded-2xl rounded-tr-none shadow-2xl flex items-center gap-2 border-2 border-black" onClick={() => {setActiveTab("chat"); setShowBubble(false)}}>
             <img src="/icon-192.png" className="w-6 h-6 rounded-full bg-black" />
             <p className="text-[10px] font-black uppercase">Message de Joseph</p>
          </div>
        </div>
      )}

      {/* --- CONTENU --- */}
      <div className="w-full">
        
        {/* SECTION FACEBOOK / INSTAGRAM (Home) */}
        {activeTab === "home" && (
          <section className="animate-in fade-in duration-500">
            <div className="bg-gradient-to-br from-zinc-900 to-black m-4 p-6 rounded-[2rem] border border-yellow-500/20 shadow-2xl">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="text-yellow-500" size={16} />
                <p className="text-yellow-500 font-black text-[10px] uppercase tracking-[0.2em]">Joseph Guilavogui</p>
              </div>
              <h2 className="text-2xl font-black mb-4">L'Elite Mondiale est ici.</h2>
              <button onClick={() => setSubs(subs + 1)} className="w-full bg-yellow-500 text-black font-black py-4 rounded-2xl uppercase text-xs tracking-widest active:scale-95 transition-all">
                S'ABONNER ({subs})
              </button>
            </div>

            {/* Posts Style Réseaux Sociaux */}
            {[1, 2].map((i) => (
              <div key={i} className="mb-8 border-b border-zinc-900 pb-6">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-black">JG</div>
                  <p className="font-black text-sm uppercase">Empire Guisoga</p>
                </div>
                <div className="aspect-video bg-zinc-900 flex items-center justify-center group relative cursor-pointer" onClick={() => setActiveTab("video")}>
                  <Play size={48} className="text-yellow-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <p className="absolute bottom-4 left-4 text-[10px] font-bold text-gray-500">VOIR LE DIRECT GRATUITEMENT</p>
                </div>
                <div className="flex gap-8 p-4 px-6">
                  <Heart size={24} className="hover:text-red-500 cursor-pointer" />
                  <MessageCircle size={24} className="hover:text-yellow-500 cursor-pointer" onClick={() => setActiveTab("chat")} />
                  <Share2 size={24} className="ml-auto cursor-pointer" />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* SECTION TIKTOK / YOUTUBE (Video) */}
        {activeTab === "video" && (
          <section className="animate-in zoom-in duration-300">
            <div className="relative aspect-video w-full bg-black shadow-[0_0_50px_rgba(212,175,55,0.1)]">
              <iframe 
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${currentVid}?autoplay=1&mute=0&controls=1`} 
                allowFullScreen
              ></iframe>
              <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded-full text-[10px] font-bold animate-pulse">EN DIRECT</div>
            </div>
            <div className="p-4 grid grid-cols-1 gap-3 mt-4">
              {channels.map((ch) => (
                <div key={ch.id} onClick={() => setCurrentVid(ch.id)} className={`p-4 rounded-2xl flex items-center gap-4 cursor-pointer transition-all ${currentVid === ch.id ? "bg-yellow-500 text-black" : "bg-zinc-900 text-white border border-white/5"}`}>
                  <Play size={20} fill={currentVid === ch.id ? "black" : "none"} />
                  <div>
                    <p className="font-black text-xs uppercase">{ch.name}</p>
                    <p className="text-[10px] opacity-60">{ch.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION TELEGRAM / MESSENGER (Chat) */}
        {activeTab === "chat" && (
          <section className="flex flex-col h-[75vh] p-4 animate-in slide-in-from-right">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`p-4 rounded-[2rem] max-w-[80%] ${m.isMe ? "bg-yellow-500 text-black rounded-tr-none font-bold" : "bg-zinc-900 text-white rounded-tl-none border border-white/5"}`}>
                    <p className="text-sm">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 bg-zinc-900 p-2 rounded-3xl border border-white/10">
              <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} placeholder="Message privé..." className="flex-1 bg-transparent px-4 outline-none text-sm" />
              <button onClick={handleSendMessage} className="bg-yellow-500 p-3 rounded-2xl text-black font-bold"><Send size={18} /></button>
            </div>
          </section>
        )}

        {/* SECTION RENCONTRES */}
        {activeTab === "dating" && (
          <section className="p-4 grid grid-cols-2 gap-4 animate-in slide-in-from-left">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[3/4] bg-zinc-900 rounded-[2.5rem] relative overflow-hidden group border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-4">
                  <p className="font-black text-[10px] uppercase">Membre Global {i}</p>
                  <p className="text-[8px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1">
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div> En Ligne
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* BARRE DE NAVIGATION (FIXE) */}
      <nav className="fixed bottom-0 w-full bg-black/95 backdrop-blur-xl border-t border-zinc-900 px-10 py-5 flex justify-between items-center z-[200]">
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