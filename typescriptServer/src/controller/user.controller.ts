import {UserService} from '../services/user.service';
import {hashPassword} from '../utils/hash';
import { IRegister,ILogin } from '../dto/DTO';
import { logger } from '../utils/logger';


export class UserController{
    private userService;
    public constructor(){
        this.userService = new UserService;
    }
    public async register(body:IRegister){
        const hash = await hashPassword(body.password);
        if (!body.bio) body.bio = '';
        if (!body.profilePicUrl) body.profilePicUrl = '';
        const register = await this.userService.register(body.username,hash,body.email,body.bio,body.profilePicUrl);
        return register;
    }
    public async login(body:ILogin){
        const login = await this.userService.login(body.username,body.password);
        return login;
    }
    public async me(username:string){
        const userInfo = await this.userService.me(username);
        return userInfo;
    }
    public async editUser(user:string,body:Partial<IRegister>){
        if(body.password){
            const hash = await hashPassword(body.password);
            body.password = hash;
        }
        const userInfo = await this.userService.editUser(user,body.password,body.email,body.bio,body.profilePicUrl);
        return userInfo;
    }


}