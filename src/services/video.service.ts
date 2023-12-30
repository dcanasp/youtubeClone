import { videos } from '../../models/videos';
import { logger} from '../utils/logger';
import amqplib from 'amqplib';
import {generateUuid} from '../utils/createUUID'

type processing_status ="pending" | "processing" | "completed" 

export class VideoService{
    public constructor(){

    }
    public async upload(videoUuid:string,user_id:number,title:string,description:string,processing_status:processing_status,tags:string,file_url:string,thumbnail_url:string,){
        try {
            const newVideo = await videos.create({user_id,title,description,uuid:videoUuid ,processing_status,tags,file_url,thumbnail_url});
            return {"success":true};
        }
        catch (error:any) {
            logger.error('Error fetching data:', error);
            return { "success": false, "err": error.message };
        }
        
    }
    public async uploadToQueue(UserName:string,uuid:string,content:Buffer){
        try {
            const user = process.env.rabbitMQCredentials;
            const url = process.env.rabbitMQServerIP;
            const connection = await amqplib.connect(`amqp://${user}@${url}:5672`);
            const channel = await connection.createChannel();
    
            const queueName = 'video_processing_queue';
            await channel.assertQueue(queueName, { durable: true });
        
            const message = {
                uuid: uuid,
                UserName: UserName,
                videoData: content.toString('base64')
            };
    
            const messageBuffer = Buffer.from(JSON.stringify(message));
    
            channel.sendToQueue(queueName, messageBuffer, {
                persistent: true 
            });
    
            console.log(' [x] Sent message to queue:', uuid);
    
            await channel.close();
            await connection.close();
    
            return {"success": true, "uuid": uuid};
        }
        catch (error) {
            logger.error('Error in sending to queue:', error);
            return { "success": false, "err": error };
        }
        
    }
   
    public async changeVideo_status (video_id:string,status:processing_status){
        const video = await videos.findOne({
            where: {
                uuid: video_id
            }
        });
        if (!video){
            return {"success":false,err:"No video with that uuid"}
        }
        const updates:Partial<typeof video.dataValues> = {};
        updates.processing_status = status

        await video.update(updates);

        return {success:true};   

    }

    public async test(){
        return true;
    }
}