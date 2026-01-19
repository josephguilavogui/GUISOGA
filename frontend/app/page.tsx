"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [isRegister, setIsRegister] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  // Redirection si déjà connecté
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/home");
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const url = isRegister
      ? "http://localhost:5000/api/users/register"
      : "http://localhost:5000/api/users/login";

    const body = isRegister
      ? { username, email, password }
      : { email, password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(typeof data === "string" ? data : "Erreur");
        return;
      }

      // Si inscription → retour connexion
      if (isRegister) {
        setIsRegister(false);
        setUsername("");
        setPassword("");
        return;
      }

      // Connexion
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/home");
    } catch {
      setError("Erreur serveur");
    }
  };

  return (
    <div className="login-container">
      {/* GAUCHE */}
      <div className="login-left">
        <Image src="/logo.png" alt="GUISOGA" width={120} height={120} />
        <h1>Bienvenue dans</h1>
        <h2>L’EMPIRE DE JOSEPH GUILAVOGUI</h2>
        <p>GUISOGA – Le réseau social nouvelle génération</p>
      </div>

      {/* DROITE */}
      <div className="login-right">
        <form onSubmit={handleSubmit}>
          <h3>{isRegister ? "Créer un compte" : "Connexion"}</h3>

          {isRegister && (
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">
            {isRegister ? "Créer le compte" : "Se connecter"}
          </button>

          {!isRegister ? (
            <>
              <a className="forgot">Mot de passe oublié ?</a>
              <p
                className="switch"
                onClick={() => setIsRegister(true)}
              >
                Créer un nouveau compte
              </p>
            </>
          ) : (
            <p
              className="switch"
              onClick={() => setIsRegister(false)}
            >
              Déjà un compte ? Se connecter
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
