import {VideoService} from '../services/video.service';
import {hashPassword} from '../utils/hash';
import { IRegister,ILogin, IVideo } from '../dto/DTO';
import { logger } from '../utils/logger';
import {uploadToS3} from '../aws/addS3';
import {generateUuid} from '../utils/createUUID'

export class VideoController{
    private videoService;
    public constructor(){
        this.videoService = new VideoService();
    }
public async upload(userId:number,username:string,body:IVideo){
        if(!body.content){
            return { "success": false, "err": 'No content Sent' };
        }
        const videoId = generateUuid();
        logger.trace(videoId)
        const upload = await this.videoService.upload(videoId,userId,body.title.value,body.description?.value||'','pending',body.tags?.value||'',body.fileUrl?.value||'',body.thumbnailUrl?.value||'');
        if (upload.success === true){
            const url = await uploadToS3(videoId,Buffer.from(body.content._buf),username);
            // const url = await uploadToS3(body.content.filename,Buffer.from(body.content._buf),username);
            const uploadToQUeue = this.videoService.uploadToQueue(username,videoId,Buffer.from(body.content._buf));
            // changeVideo_status
            this.videoService.changeVideo_status(videoId,'processing')
            return url
        }
        return upload;
    }

}