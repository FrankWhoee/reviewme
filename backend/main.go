package main

import (
	// "context"
	"encoding/json"
	// "fmt"
	"io"
	"log"
	"net/http"
	// "net/url"

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
		// myUrl, _ := url.Parse(r.RequestURI)
		// params, _ := url.ParseQuery(myUrl.RawQuery)
		// docs := db.FetchAll()
		var a [2]review.Review
		a[0].Text = `SAUSAGE CRUST
		I had a blast making Pizza with my friends today. Eric and Sam's pizza were very mid.
		
		I WOULD give pizza 5 stars if we only had made the first 3, but cus of the last one,
		I give pizza, 3 stars.`
		a[0].Title = "Pizza"
		a[0].Email = "joanne.jiwoo@gmail.com"
		a[0].Rating = 3

		a[1].Text = `WHAT ARE WE TO DO about the clichéd beauty of an ostentatious sunset? Should we cut it with menace, as Roberto Bolaño did so brilliantly, writing, “The sky at sunset looked like a carnivorous flower”? Should we lean in to the inherent sentimentality, as Kerouac does in On the Road when he writes, “Soon it got dusk, a grapy dusk, a purple dusk over tangerine groves and long melon fields . . . the fields the color of love and Spanish mysteries”? Or perhaps we should turn to mysticism, as Anna Akhmatova did when she wrote that in the face of a beautiful sunset,`

		a[1].Title = "Sunsets"
		a[1].Email = "johngreen@gmail.com"
		a[1].Rating = 5
		json.NewEncoder(w).Encode(a)
		w.WriteHeader(http.StatusAccepted)

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
