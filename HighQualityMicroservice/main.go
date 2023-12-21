package main

import (
	"context"
	"log"
	"os"
	"ytclone/queue"
	"ytclone/s3Connect"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

func main() {
	var region string = os.Getenv("AWS_REGION")
	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithRegion(region), // Replace with your region
	)
	if err != nil {
		log.Fatalf("Unable to load SDK config, %v", err)
	}

	s3Client := s3.NewFromConfig(cfg)

	bucketBasics := s3Connect.BucketBasics{S3Client: s3Client}
	queue.ListenToQueue(bucketBasics)
}

// import (
// 	"fmt"
// 	"net/http"

// 	"github.com/gorilla/mux"
// )

// func main() {

//video_processing_queue
// r := mux.NewRouter()

// r.HandleFunc("/books/{title}/page/{page}", func(w http.ResponseWriter, r *http.Request) {
// 	vars := mux.Vars(r)
// 	title := vars["title"]
// 	page := vars["page"]

// 	fmt.Fprintf(w, "You've requested the book: %s on page %s\n", title, page)
// })

// http.ListenAndServe(":80", r)
// }
