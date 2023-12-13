import {users} from '../../models/users';
import { logger} from '../utils/logger';
import {signToken} from '../auth/createToken';
import { verifyHash } from '../utils/hash';

export class UserService{
    public constructor(){

    }
    public async register(username:string,hash:string,email:string,bio:string,profile_picture_url:string){

        try {
            if (!email.includes('@')){
                throw new Error('Invalid email');
            }
            const newUser = await users.create({username,password:hash,email,bio,profile_picture_url });
            const token = await signToken({username});
            return {"success":true,"token":token};
        }
        catch (error:any) {
            logger.error('Error fetching data:', error);
            return { "success": false, "err": error.message };
        }
        
    }
    public async login(username:string,password:string){
        try {
            const user = await users.findOne({
                where: {
                    username: username
                }
            });
            if(!user){
                return { "success": false, "err": "unkown username" };
            }
            if (await verifyHash(password,user.dataValues.password) === false){
                return { "success": false, "err": "unvalid credentials" };
            }
            const token = await signToken({username});
            return {"success":true,"token":token};
        }
        catch (error:any) {
            logger.error('Error fetching data:', error);
            return { "success": false, "err": error.message };
        }
        
    }
 
    public async me(username:string){
        try {
            const user = await users.findOne({
                where: {
                    username: username
                }
            });
            if(!user){
                return { "success": false, "err": "unkown username" };
            }
            const { password, ...userInfoWithoutPassword } = user.dataValues;
            return { ...userInfoWithoutPassword, success: true };
        }
        catch (error:any) {
            logger.error('Error fetching data:', error);
            return { "success": false, "err": error.message };
        }
        
    }
 
    public async editUser(username:string,hash?:string,email?:string,bio?:string,profile_picture_url?:string){
        try {
            // First, find the user by username
            const user = await users.findOne({
                where: { username: username }
            });
            if(!user){
                return { "success": false, "err": "unkown username" };
            }
            // Update the user fields if the new values are provided
            const updates:Partial<typeof user.dataValues> = {};
            if (hash !== undefined) {
                updates.password = hash;
            }
            if (email !== undefined) {
                updates.email = email;
            }
            if (bio !== undefined) {
                updates.bio = bio;
            }
            if (profile_picture_url !== undefined) {
                updates.profile_picture_url = profile_picture_url;
            }

            // Check if there are any updates to be made
            if (Object.keys(updates).length > 0) {
                await user.update(updates);
            }

            const { password, ...userInfoWithoutPassword } = user.dataValues;
            return { ...userInfoWithoutPassword, success: true };
            return user;
        }
        catch (error:any) {
            logger.error('Error fetching data:', error);
            return { "success": false, "err": error.message };
        }
        
    }
 

}