package queue

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"ytclone/s3Connect"

	"github.com/joho/godotenv"
	"github.com/streadway/amqp"
)

type QueueMessage struct {
	VideoData string `json:"videoData"`
	UserName  string
	UUID      string `json:"uuid"`
}

func checkEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

}

func ListenToQueue(bucketBasics s3Connect.BucketBasics) {
	checkEnv()
	queueName := os.Getenv("queueName")
	MQCredentials := os.Getenv("rabbitMQCredentials")
	MQServerIp := os.Getenv("rabbitMQServerIP")

	conn, err := amqp.Dial(fmt.Sprintf("amqp://%s@%s:5672", MQCredentials, MQServerIp))
	// amqp://${user}@${url}:5672
	if err != nil {
		log.Fatalf("Failed to connect to RabbitMQ: %s", err)
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Failed to open a channel: %s", err)
	}
	defer ch.Close()

	msgs, err := ch.Consume(
		queueName, // queue
		"",        // consumer
		true,      // auto-ack
		false,     // exclusive
		false,     // no-local
		false,     // no-wait
		nil,       // args
	)
	if err != nil {
		log.Fatalf("Failed to register a consumer: %s", err)
	}

	forever := make(chan bool)

	go func() {
		for d := range msgs {
			var msg QueueMessage
			if err := json.Unmarshal(d.Body, &msg); err != nil {
				log.Printf("Error decoding JSON: %s", err)
				continue
			}

			videoBuffer, err := base64.StdEncoding.DecodeString(msg.VideoData)
			if err != nil {
				log.Printf("Error decoding base64 video data: %s", err)
				continue
			}

			fmt.Printf("Received a message: %s with video buffer size: %d\n", msg.UUID, len(videoBuffer))
			//UPLOAD TO S3
			BucketName := os.Getenv("S3_BUCKET")
			s3CreationErr := bucketBasics.UploadBuffer(BucketName, msg.UserName, "GO"+msg.UUID, videoBuffer)
			if s3CreationErr != nil {
				log.Printf("Error uploading to S3: %v", err)
			}
			//Send to server that upload is completed
			resp, err := MarkCompleted(msg.UUID)
			if err != nil {
				log.Fatalf("Error when marking as completed: %v", err)
			}
			fmt.Printf("MarkCompleted response: %v\n", resp)

		}
	}()

	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever
}
