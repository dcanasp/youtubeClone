import { error } from 'console';
import {users} from '../../models/users';
import { logger} from '../utils/logger';

export class UserService{
    public constructor(){

    }
    public async register(username:string,hash:string,email:string,bio:string,profile_picture_url:string){

        try {
            if (!email.includes('@')){
                throw new Error('Invalid email');
            }
            const newUser = await users.create({username,password:hash,email,bio,profile_picture_url })
            return {"success":true};
        }
        catch (error:any) {
            logger.error('Error fetching data:', error);
            return { "success": false, "err": error.message };
        }
        
    }

}