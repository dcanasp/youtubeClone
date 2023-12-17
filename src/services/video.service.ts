import { videos } from '../../models/videos';
import { logger} from '../utils/logger';


type processing_status ="pending" | "processing" | "completed" | undefined

export class VideoService{
    public constructor(){

    }
    public async upload(user_id:number,title:string,description:string,processing_status:processing_status,tags:string,file_url:string,thumbnail_url:string,){
        try {
            const newVideo = await videos.create({user_id,title,description,processing_status,tags,file_url,thumbnail_url});
            return {"success":true};
        }
        catch (error:any) {
            logger.error('Error fetching data:', error);
            return { "success": false, "err": error.message };
        }
        
    }
   

}