import {hash,verify} from 'argon2'

export async function hashPassword(password:string): Promise<string>{
    
    try {
        const hashPassword = await hash(password);
        return hashPassword;
        
    } catch (error:any) {
        throw new error(error.message)
    }

} 
export async function verifyHash(password:string, hash:string): Promise<boolean> {

    if (await verify(hash,password)) {
        return true;
    } else {
        return false;
    }
}