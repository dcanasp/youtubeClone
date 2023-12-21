package s3Connect

import (
	"bytes"
	"context"
	"log"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type BucketBasics struct {
	S3Client *s3.Client
}

// UploadFile reads from a file and puts the data into an object in a bucket.
func (basics BucketBasics) UploadBuffer(bucketName string, folderPath string, objectKey string, buffer []byte) error {
	fullObjectKey := folderPath + "/" + objectKey
	_, err := basics.S3Client.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(fullObjectKey),
		Body:   bytes.NewReader(buffer),
	})
	if err != nil {
		log.Printf("Couldn't upload buffer to %v:%v. Here's why: %v\n", bucketName, fullObjectKey, err)
	}
	return err
}
