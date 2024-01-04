package main

import (
	"log"
	"net/http"
	"os"
)

func handler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		// Serve the resource.
	case http.MethodPost:
		// Create a new record.
	case http.MethodPut:
		// Update an existing record.
	case http.MethodDelete:
		// Remove the record.
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
	log.Fatal(http.ListenAndServe(":8080", nil))
}
