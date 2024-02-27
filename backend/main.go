package main

import (
	// "context"
	"encoding/json"
	"io"
	"log"
	"net/http"

	// "cloud.google.com/go/firestore"
	// firebase "firebase.google.com/go"
	// "firebase.google.com/go/auth"

	// "google.golang.org/api/option"

	"reviewme/backend/fb"
	"reviewme/backend/review"
)

var db *fb.FbClient = new(fb.FbClient)

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
		var review review.Review
		json.Unmarshal(body, &review)
		err := db.Push(review)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}
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

// func addReview(review *Review) {

// }

func main() {
	db.New("/home/fhui/.gcreds/reviewme-af36c-firebase-adminsdk-490nn-b2e1ae3701.json")
	defer db.Close()

	http.HandleFunc("/review", handler)
	log.Fatal(http.ListenAndServe(":8000", nil))
}
