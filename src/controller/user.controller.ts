import {UserService} from '../services/user.service';
import {hashPassword} from '../utils/hash';
import { IRegister } from '../dto/userDTO';


export class UserController{
    private userService;
    public constructor(){
        this.userService = new UserService;
    }
    public async register(body:IRegister){
        const hash = await hashPassword(body.password);
        if (!body.bio) body.bio = '';
        if (!body.profilePicUrl) body.profilePicUrl = '';
        const register = this.userService.register(body.username,hash,body.email,body.bio,body.profilePicUrl)
        return register;
    }

}