"use client";
import { useState, useEffect } from "react";
// Importation sécurisée de tous les composants nécessaires
import { 
  Home, Tv, MessageCircle, Users, Heart, PlusSquare, 
  Search, Share2, ChevronLeft, Send, X, Play, ShieldCheck 
} from "lucide-react";

export default function GuisogaSuperApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: "Joseph Guilavogui", text: "Bienvenue dans l'empire. Tout est opérationnel.", isMe: false }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showBubble, setShowBubble] = useState(false);

  // Gestion des vidéos (Flux vérifiés)
  const channels = [
    { id: "jfKfPfyJRdk", name: "Flux Direct 1", desc: "Live 24/7" },
    { id: "5_X_GZp8aLw", name: "Flux Direct 2", desc: "Premium" }
  ];
  const [currentVid, setCurrentVid] = useState(channels[0].id);

  // Apparition de la bulle Messenger après 5 secondes
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
      
      {/* BARRE SUPÉRIEURE AVEC RETOUR DYNAMIQUE */}
      <nav className="sticky top-0 z-50 bg-black/95 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {activeTab !== "home" && (
            <button onClick={() => setActiveTab("home")} className="p-1 hover:bg-zinc-800 rounded-full">
              <ChevronLeft className="text-yellow-500" size={28} />
            </button>
          )}
          <h1 className="text-2xl font-black text-yellow-500 tracking-tighter italic cursor-pointer" onClick={() => setActiveTab("home")}>
            GUISOGA
          </h1>
        </div>
        <div className="flex gap-4 items-center">
          <Search className="text-gray-400 cursor-pointer" />
          <div className="relative cursor-pointer" onClick={() => {setActiveTab("chat"); setShowBubble(false)}}>
            <MessageCircle className={activeTab === "chat" ? "text-yellow-500" : "text-gray-400"} />
            {showBubble && <span className="absolute -top-1 -right-1 bg-red-600 w-2 h-2 rounded-full animate-ping"></span>}
          </div>
        </div>
      </nav>

      {/* BULLE MESSENGER FLOTTANTE */}
      {showBubble && (
        <div className="fixed top-20 right-4 z-[100] animate-in slide-in-from-right duration-500">
          <div 
            className="bg-yellow-500 text-black p-3 rounded-2xl rounded-tr-none shadow-2xl flex items-center gap-2 border-2 border-black cursor-pointer"
            onClick={() => {setActiveTab("chat"); setShowBubble(false)}}
          >
             <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-[10px] font-bold text-yellow-500">JG</div>
             <p className="text-[10px] font-black uppercase tracking-tighter">Message de Joseph</p>
             <X size={14} className="ml-1" onClick={(e) => { e.stopPropagation(); setShowBubble(false); }} />
          </div>
        </div>
      )}

      {/* ZONE DE CONTENU PRINCIPAL */}
      <div className="w-full">
        
        {/* --- ACCUEIL (Style Flux Privé) --- */}
        {activeTab === "home" && (
          <section className="animate-in fade-in">
            <div className="bg-zinc-900/60 m-4 p-6 rounded-[2.5rem] border border-yellow-500/20 text-center shadow-2xl">
              <ShieldCheck className="text-yellow-500 mx-auto mb-3" size={32} />
              <h2 className="text-xl font-black mb-1 uppercase tracking-tighter">Système d'Analyse Privé</h2>
              <p className="text-gray-500 text-[10px] uppercase font-bold mb-6 tracking-widest">Joseph Guilavogui</p>
              
              <button 
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`w-full font-black py-4 rounded-2xl uppercase text-xs tracking-[0.2em] transition-all active:scale-95 ${
                  isSubscribed ? "bg-zinc-800 text-gray-500 border border-zinc-700" : "bg-white text-black hover:bg-yellow-500"
                }`}
              >
                {isSubscribed ? "ABONNÉ AU FLUX ✓" : "S'ABONNER AU FLUX PRIVÉ"}
              </button>
            </div>

            {/* FIL D'ACTUALITÉ RÉSEAUX SOCIAUX */}
            {[1, 2].map((i) => (
              <div key={i} className="mb-8 border-b border-zinc-900 pb-4">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-8 h-8 rounded-full border border-yellow-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold">JG</div>
                  </div>
                  <p className="font-black text-xs uppercase tracking-tighter">GUISOGA Officiel</p>
                </div>
                <div 
                  className="aspect-video bg-zinc-900 flex items-center justify-center cursor-pointer group relative"
                  onClick={() => setActiveTab("video")}
                >
                  <Play size={40} className="text-yellow-500 opacity-40 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
                </div>
                <div className="flex gap-8 p-4 px-6">
                  <Heart size={22} className="cursor-pointer hover:text-red-500 transition-colors" />
                  <MessageCircle size={22} className="cursor-pointer hover:text-yellow-500" onClick={() => setActiveTab("chat")} />
                  <Share2 size={22} className="ml-auto cursor-pointer" />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* --- SECTION VIDÉO (Flux TV Garden) --- */}
        {activeTab === "video" && (
          <section className="animate-in zoom-in duration-300">
            <div className="relative aspect-video w-full bg-black shadow-2xl">
              <iframe 
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${currentVid}?autoplay=1&mute=0&controls=1`} 
                allowFullScreen
                title="GUISOGA Live"
              ></iframe>
              <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div> EN DIRECT
              </div>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Flux Disponibles</p>
              {channels.map((ch) => (
                <div 
                  key={ch.id} 
                  onClick={() => setCurrentVid(ch.id)} 
                  className={`p-4 rounded-[1.5rem] flex items-center gap-4 cursor-pointer transition-all ${
                    currentVid === ch.id ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20" : "bg-zinc-900 text-white border border-white/5"
                  }`}
                >
                  <Play size={18} fill={currentVid === ch.id ? "black" : "none"} />
                  <p className="font-black text-[11px] uppercase tracking-tighter">{ch.name}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- MESSAGERIE (Style Messenger) --- */}
        {activeTab === "chat" && (
          <section className="flex flex-col h-[78vh] p-4 animate-in slide-in-from-right">
             <h2 className="text-yellow-500 font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
               <MessageCircle size={18} /> Messagerie Privée
             </h2>
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-hide">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`p-4 rounded-[1.8rem] max-w-[85%] ${
                    m.isMe ? "bg-yellow-500 text-black rounded-tr-none font-bold shadow-lg shadow-yellow-500/10" : "bg-zinc-900 text-white rounded-tl-none border border-white/5"
                  }`}>
                    <p className="text-sm leading-relaxed">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 bg-zinc-900 p-2 rounded-[2rem] border border-white/10 shadow-xl focus-within:border-yellow-500/50 transition-all">
              <input 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Message éminent..." 
                className="flex-1 bg-transparent px-5 py-3 text-sm outline-none" 
              />
              <button onClick={handleSendMessage} className="bg-yellow-500 p-4 rounded-[1.5rem] text-black active:scale-90 transition-all">
                <Send size={20} strokeWidth={3} />
              </button>
            </div>
          </section>
        )}

        {/* --- RENCONTRES (Correction Hydration) --- */}
        {activeTab === "dating" && (
          <section className="p-4 grid grid-cols-2 gap-4 animate-in slide-in-from-left">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[3/4] bg-zinc-900 rounded-[2.5rem] relative overflow-hidden group border border-white/5 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>
                <div className="absolute bottom-5 left-5">
                  <p className="font-black text-[10px] uppercase tracking-tighter text-white">Membre Global {i}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
                    <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">En Ligne</span>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* BARRE DE NAVIGATION INFÉRIEURE (FIXE) */}
      <nav className="fixed bottom-0 w-full bg-black/95 backdrop-blur-xl border-t border-zinc-900 px-10 py-5 flex justify-between items-center z-[200]">
        <Home 
          title="Accueil"
          className={`cursor-pointer transition-all duration-300 ${activeTab === "home" ? "text-yellow-500 scale-125 shadow-yellow-500/50" : "text-zinc-700 hover:text-zinc-500"}`} 
          onClick={() => setActiveTab("home")} 
        />
        <Tv 
          title="Vidéos Live"
          className={`cursor-pointer transition-all duration-300 ${activeTab === "video" ? "text-yellow-500 scale-125" : "text-zinc-700 hover:text-zinc-500"}`} 
          onClick={() => setActiveTab("video")} 
        />
        <Users 
          title="Rencontres"
          className={`cursor-pointer transition-all duration-300 ${activeTab === "dating" ? "text-yellow-500 scale-125" : "text-zinc-700 hover:text-zinc-500"}`} 
          onClick={() => setActiveTab("dating")} 
        />
        <div 
          title="Mon Profil"
          onClick={() => setActiveTab("home")} 
          className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer ${activeTab === "home" ? "border-yellow-500 scale-110 shadow-lg" : "border-zinc-800"}`}
        >
           <img src="/icon-512.png" className="w-full h-full rounded-full object-cover" alt="Profile" />
        </div>
      </nav>
    </main>
  );
}