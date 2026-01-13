package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

// Structure d'une analyse GUISOGA
type Analysis struct {
	ID         int     `json:"id"`
	Title      string  `json:"title"`
	Content    string  `json:"content"`
	Divergence float64 `json:"divergence"` // L'angle mort calculé
}

func getFeed(w http.ResponseWriter, r *http.Request) {
	// Autoriser le Frontend à parler au Backend (CORS)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	// Exemple de données pour ton premier test
	posts := []Analysis{
		{ID: 1, Title: "Opportunité Standard", Content: "Ce que tout le monde voit.", Divergence: 0.1},
		{ID: 2, Title: "Alerte Surprise", Content: "L'angle mort détecté par GUISOGA pour gagner gros.", Divergence: 0.9},
	}

	json.NewEncoder(w).Encode(posts)
}

func main() {
	http.HandleFunc("/api/feed", getFeed)
	fmt.Println("🚀 Moteur GUISOGA lancé sur http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}