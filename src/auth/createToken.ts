import {App} from '../app';
import { logger } from '../utils/logger';
export async function signToken(payload:{username:string,userId:number}) {
    const fastifyInstance = new App().GetFastifyInstance();
    const token = fastifyInstance.jwt.sign({ payload });    
    return token;
}

