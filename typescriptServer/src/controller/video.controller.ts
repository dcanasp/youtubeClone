import { VideoService } from '../services/video.service';
import { hashPassword } from '../utils/hash';
import { IRegister, ILogin, IVideo } from '../dto/DTO';
import { logger } from '../utils/logger';
import { uploadToS3, getStreamS3 } from '../aws/s3Services';
import { generateUuid } from '../utils/createUUID'

export class VideoController {
    private videoService;
    public constructor() {
        this.videoService = new VideoService();
    }
    public async upload(userId: number, username: string, body: IVideo) {
        if (!body.content) {
            return { "success": false, "err": 'No content Sent' };
        }
        const videoId = generateUuid();
        logger.trace(videoId)
        const upload = await this.videoService.upload(videoId, userId, body.title.value, body.description?.value || '', 'pending', body.tags?.value || '', body.fileUrl?.value || '', body.thumbnailUrl?.value || '');
        if (upload.success === true) {
            const url = await uploadToS3(videoId, Buffer.from(body.content._buf), username);
            // const url = await uploadToS3(body.content.filename,Buffer.from(body.content._buf),username);
            if (url.success == false) {
                return { "success": false, err: "upload to s3 failed" }
            }
            await this.videoService.changeUrl(videoId, url.link)
            const uploadToQUeue = this.videoService.uploadToQueue(username, videoId, Buffer.from(body.content._buf));
            // changeVideo_status
            this.videoService.changeVideo_status(videoId, 'processing')
            return url
        }
        return upload;
    }

    public async getMPDFilePath(uuid:string){
        
    }
    public async findUrl(uuid: string) {
        const videoInfo = await this.videoService.findVideo(uuid);
        if (videoInfo.success == false) {
            return videoInfo
        }
        if (!videoInfo.data) {
            return { success: false, err: "no video info" }
        }
        const videoUrl = videoInfo.data.file_url
        logger.trace(videoUrl)
        return { success: true, videoUrl: videoUrl }
    }
    public async download(s3Url: string) {

        const cleanUrl = (s3Url.replace(process.env.S3_url!, "")).split("/")
        //https://ytclone-dcanasp.s3.amazonaws.com/prueba18/8f4f30cb-4701-4355-91e0-a10f5d6902e0
        const stream = await getStreamS3(cleanUrl[1], cleanUrl[0]);
        logger.debug(stream.stream)

    }


    public async stream(uuid: string) {



    }

}