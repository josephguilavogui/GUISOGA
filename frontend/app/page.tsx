"use client";
import { useState, useEffect } from "react";
import { Home, Video, Plus, MessageCircle, Menu, Search, Star, Heart, Share2, LogOut } from "lucide-react";

export default function GuisogaEmpire() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  
  // États des formulaires
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // 1. PERSISTENCE : Vérifier si une session existe déjà au chargement
  useEffect(() => {
    const sessionActive = localStorage.getItem("guisoga_session_active");
    const savedUser = localStorage.getItem("empire_user_data");
    
    if (sessionActive === "true" && savedUser) {
      const parsed = JSON.parse(savedUser);
      setFirstName(parsed.firstName);
      setIsLoggedIn(true);
    }
  }, []);

  // 2. LOGIQUE D'INSCRIPTION (Phase de création)
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = { email, password, firstName, lastName };
    localStorage.setItem("empire_user_data", JSON.stringify(newUser));
    alert("Compte créé avec succès ! Connectez-vous maintenant.");
    setIsLoginView(true); // Redirection vers connexion
  };

  // 3. LOGIQUE DE CONNEXION (Phase de vérification)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const savedUser = localStorage.getItem("empire_user_data");

    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      if (parsed.email === email && parsed.password === password) {
        localStorage.setItem("guisoga_session_active", "true");
        setFirstName(parsed.firstName);
        setIsLoggedIn(true);
      } else {
        alert("Accès refusé. Identifiants incorrects.");
      }
    } else {
      alert("Aucun compte trouvé. Veuillez créer un compte.");
    }
  };

  // 4. DÉCONNEXION
  const handleLogout = () => {
    localStorage.removeItem("guisoga_session_active");
    setIsLoggedIn(false);
  };

  // --- INTERFACE DE CONNEXION (DESIGN NOIR ET DORÉ) ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* GAUCHE : IDENTITÉ */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <img src="/logo.png" alt="GUISOGA" className="w-40 h-40 mx-auto lg:mx-0 mb-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
            <h1 className="text-7xl lg:text-8xl font-black text-[#D4AF37] italic tracking-tighter mb-4">GUISOGA</h1>
            <h2 className="text-2xl font-bold text-white uppercase leading-tight">L'EMPIRE DE JOSEPH GUILAVOGUI</h2>
            <p className="text-[#D4AF37]/60 text-lg uppercase tracking-[0.3em] font-light mt-4">L'excellence pour l'élite.</p>
          </div>

          {/* DROITE : FORMULAIRE */}
          <div className="lg:w-[420px] w-full">
            <div className="bg-[#111] p-8 rounded-[40px] border border-[#D4AF37]/20 shadow-2xl">
              <form onSubmit={isLoginView ? handleLogin : handleRegister} className="space-y-4">
                <h3 className="text-[#D4AF37] text-center font-black text-xl mb-4 uppercase">
                  {isLoginView ? "CONNEXION" : "CRÉATION DE COMPTE"}
                </h3>

                {!isLoginView && (
                  <div className="flex gap-2">
                    <input required type="text" placeholder="Prénom" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="w-1/2 bg-black border border-zinc-800 text-white p-4 rounded-2xl focus:border-[#D4AF37] outline-none" />
                    <input required type="text" placeholder="Nom" value={lastName} onChange={(e)=>setLastName(e.target.value)} className="w-1/2 bg-black border border-zinc-800 text-white p-4 rounded-2xl focus:border-[#D4AF37] outline-none" />
                  </div>
                )}

                <input 
                  required
                  type="email" 
                  autoComplete="username"
                  placeholder="E-mail" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-zinc-800 text-white text-lg p-5 rounded-2xl focus:border-[#D4AF37] outline-none"
                />
                <input 
                  required
                  type="password" 
                  autoComplete="current-password"
                  placeholder="Mot de passe" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-zinc-800 text-white text-lg p-5 rounded-2xl focus:border-[#D4AF37] outline-none"
                />
                
                <button type="submit" className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8A2E] text-black font-black py-4 rounded-2xl text-xl hover:brightness-110 uppercase transition-all">
                  {isLoginView ? "ENTRER" : "CRÉER MON COMPTE"}
                </button>
                
                <hr className="border-zinc-800 my-4" />
                
                <button 
                  type="button" 
                  onClick={() => setIsLoginView(!isLoginView)}
                  className="w-full bg-zinc-900 text-white font-bold py-4 rounded-2xl hover:bg-zinc-800 border border-zinc-700 transition-all text-sm"
                >
                  {isLoginView ? "Créer nouveau compte" : "Déjà membre ? Se connecter"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- ACCUEIL DE L'EMPIRE (APRES CONNEXION) ---
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
       <nav className="p-4 bg-zinc-950 border-b border-[#D4AF37]/20 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-black text-[#D4AF37] italic">GUISOGA</h1>
        <button onClick={handleLogout} className="text-zinc-500 hover:text-red-500 transition-colors">
          <LogOut size={22} />
        </button>
      </nav>

      <main className="flex-1 max-w-2xl mx-auto w-full p-4 space-y-6">
        <div className="bg-zinc-900/50 p-8 rounded-[35px] border border-zinc-800 shadow-xl">
          <h2 className="text-2xl font-black italic tracking-tighter uppercase">BIENVENUE, {firstName} !</h2>
          <p className="text-zinc-500 mt-2 text-sm">Votre session est sécurisée. Explorez l'Empire.</p>
        </div>

        {/* FEED / POST */}
        <div className="bg-zinc-900/30 rounded-[35px] border border-zinc-800 overflow-hidden">
          <div className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold uppercase">{firstName[0]}</div>
            <div>
              <p className="font-black text-sm flex items-center gap-1 uppercase">{firstName} {lastName} <Star size={12} className="text-[#D4AF37] fill-[#D4AF37]" /></p>
              <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">Membre de l'Empire</p>
            </div>
          </div>
          <div className="h-60 bg-zinc-800/50 flex flex-col items-center justify-center text-zinc-600 italic">
            Flux GUISOGA bientôt disponible...
          </div>
          <div className="p-6 flex justify-around">
            <Heart size={24} className="text-zinc-700" />
            <MessageCircle size={24} className="text-zinc-700" />
            <Share2 size={24} className="text-zinc-700" />
          </div>
        </div>
      </main>

      {/* NAV BAR BASSE */}
      <nav className="bg-zinc-950 border-t border-[#D4AF37]/10 p-4 flex justify-around sticky bottom-0 backdrop-blur-md">
        <Home className="text-[#D4AF37]" size={28} />
        <Video className="text-zinc-700" size={28} />
        <div className="bg-[#D4AF37] text-black rounded-2xl p-1 px-3 flex items-center"><Plus size={24} strokeWidth={3} /></div>
        <MessageCircle className="text-zinc-700" size={28} />
        <Menu className="text-zinc-700" size={28} />
      </nav>
    </div>
  );
}