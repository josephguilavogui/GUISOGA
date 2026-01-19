"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    naissance: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    setError("");

    if (!form.prenom || !form.nom || !form.email || !form.password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: `${form.prenom} ${form.nom}`,
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Erreur lors de l’inscription");
      return;
    }

    router.push("/");
  };

  return (
    <div className="min-h-screen flex bg-black text-white">

      {/* GAUCHE */}
      <div className="w-1/2 flex flex-col justify-center pl-24 pr-16">
        <Image src="/logo.png" alt="GUISOGA" width={260} height={260} />
        <h1 className="mt-14 text-6xl font-extrabold leading-tight">
          Rejoignez l&apos;empire de
          <br />
          <span className="text-yellow-500">JOSEPH GUILAVOGUI</span>
        </h1>
        <p className="mt-8 text-2xl text-gray-300">
          Créez votre compte GUISOGA et entrez dans la nouvelle ère sociale.
        </p>
      </div>

      {/* DROITE */}
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-b from-black to-gray-900">
        <div className="w-[450px] bg-black border border-yellow-500/50 rounded-2xl p-10 shadow-2xl">

          <h2 className="text-3xl font-bold text-center text-yellow-500 mb-8">
            Créer un compte
          </h2>

          <div className="flex gap-4 mb-4">
            <input name="prenom" placeholder="Prénom" className="input" onChange={handleChange} />
            <input name="nom" placeholder="Nom" className="input" onChange={handleChange} />
          </div>

          <input
            type="date"
            name="naissance"
            className="input mb-4"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Adresse email"
            className="input mb-4"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            className="input mb-4"
            onChange={handleChange}
          />

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <button
            onClick={handleSignup}
            className="w-full bg-yellow-500 text-black py-4 text-xl rounded font-bold hover:bg-yellow-400 transition"
          >
            S&apos;inscrire
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full mt-6 text-yellow-500 hover:underline"
          >
            Déjà un compte ? Se connecter
          </button>
        </div>
      </div>
    </div>
  );
}
