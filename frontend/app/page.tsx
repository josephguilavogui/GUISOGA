"use client";
import { useState } from "react";
// Importation cruciale de TOUTES les icônes nécessaires
import { Home, Tv, MessageCircle, Users, Heart, PlusSquare, Search, Share2 } from "lucide-react";

export default function GuisogaSuperApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [subs, setSubs] = useState(1);

  return (
    <main className="min-h-screen bg-black text-white font-sans pb-20">
      
      {/* BARRE SUPÉRIEURE (Style Facebook/Instagram) */}
      <nav className="sticky top-0 z-50 bg-black border-b border-zinc-800 px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-black text-yellow-500 tracking-tighter">GUISOGA</h1>
        <div className="flex gap-4">
          <PlusSquare className="text-gray-300 cursor-pointer" />
          <Search className="text-gray-300 cursor-pointer" />
          <div className="relative cursor-pointer" onClick={() => setSubs(subs + 1)}>
            <MessageCircle className="text-gray-300" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-[10px] font-bold px-1 rounded-full">{subs}</span>
          </div>
        </div>
      </nav>

      {/* CONTENU DYNAMIQUE */}
      <div className="p-0">
        {activeTab === "home" && (
          <section className="animate-in fade-in duration-500">
            <div className="bg-zinc-900 m-4 p-4 rounded-2xl border border-yellow-500/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold">Communauté Mondiale</span>
                <span className="text-yellow-500 font-mono">{subs} Membres</span>
              </div>
              <button onClick={() => setSubs(subs + 1)} className="w-full bg-yellow-500 text-black font-bold py-2 rounded-xl text-sm active:scale-95 transition-transform">
                S'ABONNER GRATUITEMENT
              </button>
            </div>

            {[1, 2].map((post) => (
              <div key={post} className="border-b border-zinc-900 pb-4 mb-4">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-600 font-bold flex items-center justify-center">G</div>
                  <div>
                    <p className="font-bold text-sm">GUISOGA Officiel</p>
                    <p className="text-[10px] text-gray-500">Il y a 2 heures • Public</p>
                  </div>
                </div>
                <div className="aspect-square bg-zinc-800 w-full flex items-center justify-center text-gray-600">
                   <p>Espace Vidéo / Image Direct</p>
                </div>
                <div className="flex gap-6 p-4">
                  <Heart size={24} className="cursor-pointer hover:text-red-500" />
                  <MessageCircle size={24} className="cursor-pointer" />
                  <Share2 size={24} className="ml-auto cursor-pointer" />
                </div>
              </div>
            ))}
          </section>
        )}

        {activeTab === "video" && (
          <section className="h-[80vh] bg-zinc-900 flex flex-col items-center justify-center p-6 text-center">
            <Tv size={64} className="text-yellow-500 mb-4 animate-pulse" />
            <p className="text-xl font-bold italic">LIVES & VIDÉOS GRATUITES</p>
            <p className="text-sm text-gray-400 mt-2">Accès mondial illimité en cours de synchronisation...</p>
          </section>
        )}

        {activeTab === "dating" && (
          <section className="p-4 text-center space-y-6">
            <h2 className="text-xl font-bold text-yellow-500">Rencontres Mondiales</h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((u) => (
                <div key={u} className="aspect-[3/4] bg-zinc-900 rounded-3xl border border-white/5 relative overflow-hidden group">
                   <div className="absolute bottom-0 p-3 text-left w-full bg-gradient-to-t from-black">
                     <p className="text-xs font-bold">Profil Vérifié {u}</p>
                     <p className="text-[10px] text-green-500 uppercase">En ligne</p>
                   </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* BARRE DE NAVIGATION (Style Instagram) */}
      <nav className="fixed bottom-0 w-full bg-black border-t border-zinc-800 px-6 py-4 flex justify-between items-center z-50">
        <Home 
          className={`cursor-pointer ${activeTab === "home" ? "text-yellow-500" : "text-gray-500"}`} 
          onClick={() => setActiveTab("home")} 
        />
        <Tv 
          className={`cursor-pointer ${activeTab === "video" ? "text-yellow-500" : "text-gray-500"}`} 
          onClick={() => setActiveTab("video")} 
        />
        <Users 
          className={`cursor-pointer ${activeTab === "dating" ? "text-yellow-500" : "text-gray-500"}`} 
          onClick={() => setActiveTab("dating")} 
        />
        <div className="w-8 h-8 rounded-full border border-yellow-500 overflow-hidden cursor-pointer">
          <img src="/icon-192.png" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </nav>
    </main>
  );
}