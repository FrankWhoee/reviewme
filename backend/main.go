package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

type Review struct {
	Email  string
	Title  string
	Text   string
	Rating int
}

func handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers",
		"Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

	switch r.Method {
	case http.MethodGet:
		// Serve the resource.
	case http.MethodPost:
		body, _ := io.ReadAll(r.Body)
		defer r.Body.Close()
		fmt.Println(string(body))
		var review Review
		json.Unmarshal(body, &review)
		fmt.Printf("%s %s %s %d\n", review.Email, review.Title, review.Text, review.Rating)
	case http.MethodPut:
		// Update an existing record.
	case http.MethodDelete:
		// Remove the record.
	case http.MethodOptions:
		return
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func main() {
	// Check if reviews folder exists
	if _, err := os.Stat("./reviews"); os.IsNotExist(err) {
		os.Mkdir("./reviews", 0700)
	}

	http.HandleFunc("/review", handler)
	log.Fatal(http.ListenAndServe(":8000", nil))
}
