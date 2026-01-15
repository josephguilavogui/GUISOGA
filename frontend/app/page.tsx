"use client";
import { useState, useEffect } from "react";
import { Home, Video, Plus, MessageCircle, Menu, Search, Star, Heart, Share2 } from "lucide-react";

export default function GuisogaEmpire() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  
  // États pour les champs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // 1. Charger les infos sauvegardées au démarrage (Auto-remplissage)
  useEffect(() => {
    const savedUser = localStorage.getItem("empire_user_data");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setEmail(parsed.email);
      // Optionnel: on peut aussi auto-connecter si on veut
    }
  }, []);

  // 2. Fonction d'Inscription (Sauvegarde les infos)
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = { email, password, firstName, lastName };
    localStorage.setItem("empire_user_data", JSON.stringify(newUser));
    alert("Compte créé avec succès dans l'Empire ! Connectez-vous maintenant.");
    setIsLoginView(true); // Renvoie vers la connexion
  };

  // 3. Fonction de Connexion (Vérifie les infos)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const savedUser = localStorage.getItem("empire_user_data");

    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      // VERIFICATION STRICTE
      if (parsed.email === email && parsed.password === password) {
        setFirstName(parsed.firstName);
        setIsLoggedIn(true);
      } else {
        alert("Identifiants incorrects. L'Empire n'accepte que l'élite.");
      }
    } else {
      alert("Aucun compte trouvé. Veuillez d'abord créer un compte.");
    }
  };

  // --- INTERFACE DE CONNEXION / INSCRIPTION ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">
          
          <div className="lg:w-1/2 text-center lg:text-left">
            <img src="/logo.png" alt="GUISOGA" className="w-40 h-40 mx-auto lg:mx-0 mb-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
            <h1 className="text-7xl lg:text-8xl font-black text-[#D4AF37] italic tracking-tighter mb-4">GUISOGA</h1>
            <h2 className="text-2xl font-bold text-white uppercase">L'EMPIRE DE JOSEPH GUILAVOGUI</h2>
          </div>

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
                  {isLoginView ? "ENTRER" : "S'INSCRIRE"}
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

  // --- ÉCRAN D'ACCUEIL ---
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
       <nav className="p-4 bg-zinc-950 border-b border-[#D4AF37]/20 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-black text-[#D4AF37] italic">GUISOGA</h1>
        <div className="w-9 h-9 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-black uppercase">{firstName[0] || "J"}</div>
      </nav>
      <main className="flex-1 max-w-2xl mx-auto w-full p-4">
        <div className="bg-zinc-900/50 p-8 rounded-[35px] border border-zinc-800 shadow-xl">
          <h2 className="text-2xl font-black italic">BIENVENUE DANS VOTRE EMPIRE, {firstName.toUpperCase()} !</h2>
          <p className="text-zinc-500 mt-2 text-sm">Vos accès sont désormais sécurisés et mémorisés.</p>
        </div>
      </main>
    </div>
  );
}