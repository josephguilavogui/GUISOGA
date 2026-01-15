"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { Home, Video, Plus, MessageCircle, Menu, Search, Star, Heart, Share2, LogOut, Send, ArrowLeft, Music, Bookmark, TrendingUp, Smartphone, ShieldCheck } from "lucide-react";

export default function GuisogaEmpireFinal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("home"); 
  const [isLoginView, setIsLoginView] = useState(true);
  
  // États Authentification
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Logic de session robuste
  useEffect(() => {
    const session = localStorage.getItem("guisoga_session_active");
    if (session === "true") {
      try {
        const user = JSON.parse(localStorage.getItem("empire_user_data") || "{}");
        setFirstName(user.firstName || "Elite");
        setIsLoggedIn(true);
      } catch (e) {
        localStorage.removeItem("guisoga_session_active");
      }
    }
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginView) {
      const saved = JSON.parse(localStorage.getItem("empire_user_data") || "{}");
      if (saved.email === email && saved.password === password) {
        localStorage.setItem("guisoga_session_active", "true");
        setFirstName(saved.firstName);
        setIsLoggedIn(true);
      } else {
        alert("🔒 Accès refusé : Identifiants non reconnus par l'Empire.");
      }
    } else {
      const newUser = { email, password, firstName, lastName };
      localStorage.setItem("empire_user_data", JSON.stringify(newUser));
      setIsLoginView(true);
      alert("✅ Inscription réussie ! Connectez-vous à présent.");
    }
  };

  // --- INTERFACE MOBILE OPTIMISÉE ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 select-none">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 text-center lg:text-left space-y-4">
            <img src="/logo.png" alt="GUISOGA" className="w-44 h-44 mx-auto lg:mx-0 drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]" />
            <h1 className="text-8xl font-black text-[#D4AF37] italic tracking-tighter uppercase">GUISOGA</h1>
            <p className="text-white text-xl font-bold tracking-widest uppercase">L'Empire de Joseph Guilavogui</p>
            <div className="flex items-center justify-center lg:justify-start gap-2 text-[#D4AF37]/50 text-xs font-bold uppercase tracking-[0.4em]">
              <ShieldCheck size={14} /> Sécurisé par Cryptage Empire
            </div>
          </div>

          <div className="lg:w-[420px] w-full">
            <div className="bg-[#111] p-8 rounded-[40px] border border-[#D4AF37]/20 shadow-[0_0_80px_rgba(0,0,0,1)]">
              <form onSubmit={handleAuth} className="space-y-4">
                <h2 className="text-[#D4AF37] text-center font-black text-2xl mb-6 italic uppercase tracking-tighter">
                  {isLoginView ? "Connexion" : "Rejoindre l'élite"}
                </h2>
                {!isLoginView && (
                  <div className="flex gap-2">
                    <input required type="text" placeholder="Prénom" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="w-1/2 bg-black border border-zinc-800 text-white p-4 rounded-2xl outline-none focus:border-[#D4AF37]" />
                    <input required type="text" placeholder="Nom" value={lastName} onChange={(e)=>setLastName(e.target.value)} className="w-1/2 bg-black border border-zinc-800 text-white p-4 rounded-2xl outline-none focus:border-[#D4AF37]" />
                  </div>
                )}
                <input required type="email" placeholder="E-mail" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full bg-black border border-zinc-800 text-white p-5 rounded-2xl outline-none focus:border-[#D4AF37]" />
                <input required type="password" placeholder="Mot de passe" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full bg-black border border-zinc-800 text-white p-5 rounded-2xl outline-none focus:border-[#D4AF37]" />
                
                <button type="submit" className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F2D472] to-[#AA8A2E] text-black font-black py-5 rounded-2xl text-xl uppercase shadow-lg shadow-[#D4AF37]/20 active:scale-95 transition-all">
                  {isLoginView ? "Entrer" : "S'inscrire"}
                </button>
                
                <button type="button" onClick={() => setIsLoginView(!isLoginView)} className="w-full text-zinc-600 font-bold text-xs mt-4 hover:text-white uppercase tracking-widest">
                  {isLoginView ? "Créer un compte Empire" : "Déjà membre de l'élite ?"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden max-w-md mx-auto border-x border-zinc-900 shadow-2xl">
      {/* MOBILE HEADER */}
      <nav className="p-4 bg-black/90 backdrop-blur-md border-b border-[#D4AF37]/20 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-black text-[#D4AF37] italic tracking-tighter uppercase">GUISOGA</h1>
        <div className="flex gap-4">
          <Search size={22} className="text-zinc-600" />
          <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#AA8A2E] rounded-full flex items-center justify-center text-black font-black uppercase text-xs">{firstName[0]}</div>
        </div>
      </nav>

      {/* DYNAMIC CONTENT AREA */}
      <main className="flex-1 overflow-y-auto pb-20">
        {activeTab === "home" && (
          <div className="p-4 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-zinc-900/40 p-6 rounded-[35px] border border-zinc-800 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-2 opacity-10 text-[#D4AF37]"><Star size={60} /></div>
               <h2 className="text-xl font-black uppercase italic tracking-tighter">Bienvenue, {firstName}</h2>
               <p className="text-zinc-500 text-xs font-bold uppercase mt-1 tracking-widest">Statut : Membre de l'Empire</p>
            </div>
            
            {/* Feed Algo-trié */}
            <div className="bg-zinc-900/20 p-4 rounded-[35px] border border-zinc-800 space-y-4">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-[#D4AF37] font-bold">J</div>
                 <div>
                   <p className="text-xs font-black uppercase tracking-tight">Joseph Guilavogui <Star size={10} className="inline text-[#D4AF37] fill-[#D4AF37]" /></p>
                   <p className="text-[9px] text-zinc-600 font-bold uppercase">Il y a 2 heures</p>
                 </div>
               </div>
               <p className="text-sm text-zinc-300 leading-relaxed">Les analyses privées pour les grands matchs de ce week-end sont disponibles dans la messagerie.</p>
               <div className="h-40 bg-zinc-800/50 rounded-2xl border border-zinc-700/50 flex items-center justify-center text-zinc-700 italic text-xs uppercase font-bold">Image de l'analyse protégée</div>
            </div>
          </div>
        )}

        {/* MESSAGERIE SÉCURISÉE */}
        {activeTab === "chat" && (
           <div className="h-full flex flex-col p-4 animate-in fade-in duration-300">
              <div className="flex-1 space-y-4 overflow-y-auto">
                 <div className="flex flex-col items-start">
                    <div className="bg-zinc-800 p-4 rounded-3xl text-sm max-w-[85%]">
                       Bienvenue dans votre canal privé. Vos pronostics et discussions restent confidentiels.
                    </div>
                 </div>
              </div>
              <div className="mt-4 flex gap-2">
                 <input placeholder="Message à l'Empire..." className="flex-1 bg-zinc-900 border-none rounded-2xl p-4 text-sm outline-none focus:ring-1 focus:ring-[#D4AF37]" />
                 <button className="bg-[#D4AF37] text-black p-4 rounded-2xl"><Send size={20} /></button>
              </div>
           </div>
        )}

        {/* FLUX VIDÉO PLEIN ÉCRAN */}
        {activeTab === "video" && (
           <div className="h-full bg-black flex flex-col items-center justify-center text-zinc-700 italic text-xs animate-in zoom-in-95 duration-300">
              <Video size={48} className="mb-4 opacity-20" />
              Chargement des vidéos Elite...
           </div>
        )}
      </main>

      {/* MOBILE NAVIGATION BAR (Facebook/Instagram Style) */}
      <nav className="bg-black/95 border-t border-[#D4AF37]/20 p-4 flex justify-around items-center sticky bottom-0 z-50 backdrop-blur-xl">
        <Home className={activeTab === "home" ? "text-[#D4AF37] scale-110" : "text-zinc-600"} size={26} onClick={() => setActiveTab("home")} />
        <Video className={activeTab === "video" ? "text-[#D4AF37] scale-110" : "text-zinc-600"} size={26} onClick={() => setActiveTab("video")} />
        <div className="bg-gradient-to-b from-[#D4AF37] to-[#AA8A2E] text-black rounded-xl p-1 px-3 flex items-center shadow-lg shadow-[#D4AF37]/40 active:scale-90 transition-transform">
          <Plus size={24} strokeWidth={3} />
        </div>
        <MessageCircle className={activeTab === "chat" ? "text-[#D4AF37] scale-110" : "text-zinc-600"} size={26} onClick={() => setActiveTab("chat")} />
        <Menu className="text-zinc-600" size={26} onClick={() => {localStorage.removeItem("guisoga_session_active"); window.location.reload();}} />
      </nav>
    </div>
  );
}