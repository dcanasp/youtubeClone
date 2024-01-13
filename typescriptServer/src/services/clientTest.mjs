import { loadPackageDefinition, credentials } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import fs from "fs";
const packageDef = loadSync("./src/proto/videoQueue.proto", {});
const grpcObject = loadPackageDefinition(packageDef);
const videoPackage = grpcObject.videoPackage;

// Load client credentials
const caCert = fs.readFileSync('./HighQualityMicroservice/cert/ca-certificate.crt');
const clientCert = fs.readFileSync('./HighQualityMicroservice/cert/client-certificate.crt');
const clientKey = fs.readFileSync('./HighQualityMicroservice/cert/client-private-key.pem');

// Create SSL credentials
const sslCreds = credentials.createSsl(caCert, clientKey, clientCert);

const client = new videoPackage.Video("127.0.0.1:50000", sslCreds);

client.UpdateVideoStatus({
  "value": "36f7aa34-a30f-46bb-9def-36611e75ab26",
  "status": 2
}, (err, response) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Response:", response);
  }
});
