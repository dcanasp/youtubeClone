package s3Connect

import (
	"bytes"
	"context"
	"fmt"
	"log"
	"os"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type BucketBasics struct {
	S3Client *s3.Client
}

// UploadFile reads from a file and puts the data into an object in a bucket.
func (basics BucketBasics) UploadBuffer(bucketName string, folderPath string, uuid string) error {
	files, err := os.ReadDir("temp") // Read files from the "temp" folder
	if err != nil {
		return fmt.Errorf("couldn't read files from temp folder: %w", err)
	}

	for _, file := range files {
		objectKey := file.Name()
		buffer, err := os.ReadFile("temp/" + objectKey)
		if err != nil {
			log.Printf("Error getting buffer for file %s: %v\n", objectKey, err)
			continue // Skip to the next file if there's an error
		}

		fullObjectKey := folderPath + "/" + uuid + "/" + objectKey
		_, err = basics.S3Client.PutObject(context.TODO(), &s3.PutObjectInput{
			Bucket: aws.String(bucketName),
			Key:    aws.String(fullObjectKey),
			Body:   bytes.NewReader(buffer),
		})
		if err != nil {
			log.Printf("Couldn't upload buffer to %v:%v. Here's why: %v\n", bucketName, fullObjectKey, err)
		}
	}

	return nil
}
