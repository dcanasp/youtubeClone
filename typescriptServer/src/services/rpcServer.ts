import { loadPackageDefinition, Server, status, ServerCredentials, Call, requestCallback } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { VideoService } from "./video.service";
import { logger } from "../utils/logger";
import { Database } from "../db";
import fs from "fs";

const packageDef = loadSync("./src/proto/videoQueue.proto", {});
const grpcObject = loadPackageDefinition(packageDef);
const videoPackage: any = grpcObject.videoPackage;

const main = async () => {
    const db = new Database();
    await db.connect();

    //instance Server
    const server = new Server();

    server.addService(videoPackage.Video.service,
        {
            "UpdateVideoStatus": UpdateVideoStatus,
        });


        const serverKey = fs.readFileSync('./cert/server-private-key.pem');
        const serverCert = fs.readFileSync('./cert/server-certificate.crt');
        const caCert = fs.readFileSync('./cert/ca-certificate.crt');
        
        const serverCredentials = ServerCredentials.createSsl(
          caCert, 
          [{ cert_chain: serverCert, private_key: serverKey }], 
          true // This enables client certificate checking, making the connection mutually authenticated
        );
        
        // Start the server with the secure credentials
        server.bindAsync("127.0.0.1:50000", serverCredentials, (error, port) => {
          if (error) {
            logger.error(`Failed to bind server: ${error}`);
            return;
          }
          server.start();
          logger.info(`gRPC server listening on port ${port}`);
        });

}
main();

async function UpdateVideoStatus(call: any, callback: any) {
    const uuid = call.request.value;
    const videoStatus = call.request.status;
    const videoStatusString: processing_status = videoStatusToString(videoStatus);
    const videService = new VideoService();
    const response = await videService.changeVideo_status(uuid, videoStatusString);
    callback(null, response);
}


enum VideoStatus {
    PENDING = 0,
    PROCESSING = 1,
    COMPLETED = 2
}
type processing_status = "pending" | "processing" | "completed"

function videoStatusToString(status: VideoStatus): processing_status {
    const statusMapping: { [key in VideoStatus]: processing_status } = {
        [VideoStatus.PENDING]: 'pending',
        [VideoStatus.PROCESSING]: 'processing',
        [VideoStatus.COMPLETED]: 'completed'
    };

    return statusMapping[status];
}

