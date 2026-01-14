package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

// Structure des statistiques pour l'éligibilité (Sécurité & Rentabilité)
type UserStats struct {
	UserID  string `json:"userId"`
	Abonnes int    `json:"abonnes"`
	Vues    int    `json:"vues"`
}

// Structure d'une analyse GUISOGA
type Analysis struct {
	ID         int     `json:"id"`
	Title      string  `json:"title"`
	Content    string  `json:"content"`
	Divergence float64 `json:"divergence"` // L'angle mort calculé
}

// Simulation d'une base de données sécurisée
func getStats(userId string) UserStats {
	// Par défaut, on met des chiffres qui ne déclenchent pas le gain
	// tant que le créateur n'a pas travaillé pour GUISOGA
	return UserStats{UserID: userId, Abonnes: 450, Vues: 1200}
}

// Vérification stricte de l'éligibilité (Modèle Facebook/YouTube)
func verifierEligibilite(userId string) bool {
	userStats := getStats(userId)

	// Condition de rentabilité : 1000 abonnés minimum pour GUISOGA
	if userStats.Abonnes < 1000 {
		return false
	}
	return true
}

func getFeed(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	posts := []Analysis{
		{ID: 1, Title: "Opportunité Standard", Content: "Ce que tout le monde voit.", Divergence: 0.1},
		{ID: 2, Title: "Alerte Surprise", Content: "L'angle mort détecté par GUISOGA pour gagner gros.", Divergence: 0.9},
	}

	json.NewEncoder(w).Encode(posts)
}

func main() {
	http.HandleFunc("/api/feed", getFeed)
	fmt.Println("🚀 Moteur GUISOGA lancé sur http://localhost:8080")
	// Le serveur écoute sur le port 8080 pour parler à ton Messenger et ton Flux
	log.Fatal(http.ListenAndServe(":8080", nil))
}
