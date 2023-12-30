package queue

import (
	"context"
	"crypto/tls"
	"crypto/x509"
	"fmt"
	"os"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"

	// Import the generated protobuf code.
	videoPackage "ytclone/proto" // Replace with the import path you've defined in your .proto file
)

//go get google.golang.org/protobuf/cmd/protoc-gen-go
//go get google.golang.org/grpc/cmd/protoc-gen-go-grpc

type responseStruct struct {
	success bool
	err     error
}

func MarkCompleted(uuid string) (responseStruct, error) {
	fmt.Printf("Marking video as completed: %s\n", uuid)

	// Load the certificates from disk
	caCert, err := os.ReadFile("./cert/ca-certificate.crt")
	if err != nil {
		return responseStruct{false, nil}, fmt.Errorf("could not read CA certificate: %w", err)
	}

	certPool := x509.NewCertPool()
	if !certPool.AppendCertsFromPEM(caCert) {
		return responseStruct{false, nil}, fmt.Errorf("failed to add CA's certificate")
	}

	// Load the client's certificate and private key
	clientCert, err := tls.LoadX509KeyPair(
		"./cert/client-certificate.crt",
		"./cert/client-private-key.pem",
	)
	if err != nil {
		return responseStruct{false, nil}, fmt.Errorf("could not load client key pair: %w", err)
	}

	// Configure TLS with the certificates
	config := &tls.Config{
		Certificates: []tls.Certificate{clientCert},
		RootCAs:      certPool,
	}

	creds := credentials.NewTLS(config)

	// Connect to the server using TLS credentials
	conn, err := grpc.Dial("127.0.0.1:50000", grpc.WithTransportCredentials(creds))
	if err != nil {
		return responseStruct{false, nil}, fmt.Errorf("could not connect to server: %w", err)
	}
	defer conn.Close()

	client := videoPackage.NewVideoClient(conn)

	// UpdateVideoStatus RPC call
	res, err := client.UpdateVideoStatus(context.Background(), &videoPackage.Uuid{
		Value:  uuid,
		Status: videoPackage.VideoStatus_completed,
	})
	if err != nil {
		return responseStruct{false, nil}, fmt.Errorf("error calling UpdateVideoStatus: %w", err)
	}

	// Process response
	fmt.Printf("Response from server: %v\n", res)
	if res.Success {
		return responseStruct{success: true, err: nil}, nil
	}
	return responseStruct{success: false, err: nil}, nil
	// Returning a success responseStruct, assuming no error string is needed
}
