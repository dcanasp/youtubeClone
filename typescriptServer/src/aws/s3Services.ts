// npx aws-sdk-js-codemod -t v2-to-v3 'src/aws/addS3.ts' // para pasar a v3
import { PutObjectCommand,GetObjectCommand  } from "@aws-sdk/client-s3";
import {client} from './s3Instance'
import {logger} from '../utils/logger'
import { Readable } from "stream";

const bucket = process.env.S3_BUCKET;

export const uploadToS3 = async (fileName: string, fileContent: Buffer,folder:string) => {
  const fullkey = `${folder}/${fileName}/raw.mp4`
  console.log(fullkey);
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: fullkey,
    Body: fileContent,
  });

  try {
    const response = await client.send(command);
    // return response.$metadata.requestId;
    return {success: true,link: process.env.S3_url + fullkey}
} catch (err) {
    logger.error(err)
    return {success: false,link:"", err: err};
  }
};


export const getStreamS3 = async (fileName: string, folder: string): Promise<{success: boolean, stream?: Readable, err?: Error|unknown}> => {
  const fullKey = `${folder}/${fileName}`;
  console.log(fullKey);
  const command = new GetObjectCommand({
      Bucket: bucket,
      Key: fullKey,
  });

  try {
      const response = await client.send(command);
      // Directly return the stream from the response
      const stream = response.Body as Readable;
      return { success: true, stream };
  } catch (err) {
      logger.error(err);
      return { success: false, err };
  }
};