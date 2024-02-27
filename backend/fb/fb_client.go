package fb

import (
	"context"
	"errors"
	"log"
	"time"

	"reviewme/backend/review"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

type FbClient struct {
	fb *firestore.Client
}

func (f *FbClient) Push(review review.Review) error {
	ctx := context.Background()
	payload := review.Map()
	if valid, err := review.IsValid(); !valid {
		return errors.New("Review has an invalid " + err)
	}

	(*payload)["Timestamp"] = time.Now()
	_, _, err := f.fb.Collection("reviews").Add(ctx, payload)

	if err != nil {
		log.Fatalf("Failed adding review: %v", err)
	}
	return nil
}

func (f *FbClient) New(authFile string) {
	// Use a service account
	ctx := context.Background()
	// Check if reviews folder exists
	sa := option.WithCredentialsFile(authFile)
	app, err := firebase.NewApp(ctx, nil, sa)
	if err != nil {
		log.Fatalln(err)
	}

	f.fb, _ = app.Firestore(ctx)
}

func (f *FbClient) Close() {
	f.fb.Close()
}
