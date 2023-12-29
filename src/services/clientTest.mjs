
import { loadPackageDefinition, credentials } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
const packageDef = loadSync("./src/proto/videoQueue.proto", {});
const grpcObject = loadPackageDefinition(packageDef);
const videoPackage = grpcObject.videoPackage;


const client = new videoPackage.Video("localhost:50000", credentials.createInsecure())

client.UpdateVideoStatus({
  "value": "a05d34fb-5e73-4201-b961-e59f3ef3cdc9",
  "status": 2
}, (err, response) => {

  console.log("Book has been created " + JSON.stringify(response))

})
