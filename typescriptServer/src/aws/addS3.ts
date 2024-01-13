// npx aws-sdk-js-codemod -t v2-to-v3 'src/aws/addS3.ts' // para pasar a v3
import { PutObjectCommand } from "@aws-sdk/client-s3";
import {client} from './s3Instance'
import {logger} from '../utils/logger'
const bucket = process.env.S3_BUCKET;

export const uploadToS3 = async (fileName: string, fileContent: Buffer,folder:string) => {
  const fullkey = `${folder}/${fileName}`
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
    return {succes: false, err: err};
  }
};


