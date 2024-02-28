package fb

import (
	"context"
	"errors"
	"slices"
	"sort"

	// "fmt"
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
	review.Timestamp = time.Now()
	payload := review.Map()
	if valid, err := review.IsValid(); !valid {
		return errors.New("Review has an invalid " + err)
	}

	_, _, err := f.fb.Collection("reviews").Add(ctx, payload)

	if err != nil {
		log.Fatalf("Failed adding review: %v", err)
	}
	return nil
}

func (f *FbClient) FetchByTitle(Title string) []review.Review {
	ctx := context.Background()
	docs, _ := f.fb.Collection("reviews").Where("Title", "==", Title).Documents(ctx).GetAll()
	return extractCollectionAndSort(docs)
}

func (f *FbClient) FetchByEmail(Email string) []review.Review {
	ctx := context.Background()
	docs, _ := f.fb.Collection("reviews").Where("Email", "==", Email).Documents(ctx).GetAll()
	return extractCollectionAndSort(docs)
}

func extractCollectionAndSort(docs []*firestore.DocumentSnapshot) []review.Review {
	output := make([]review.Review, 0)
	for _, doc := range docs {
		output = append(output, *review.FromMap(doc.Data()))
	}
	sort.Slice(output, func(i, j int) bool {
		return output[i].Timestamp.Before(output[j].Timestamp)
	})
	slices.Reverse(output)
	return output
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
