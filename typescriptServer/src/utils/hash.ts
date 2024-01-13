import {hash,verify} from 'argon2'

export async function hashPassword(password:string): Promise<string>{
    try {
        const pepper:string = process.env.pepper || 'iAlsoForgotThePepper';
        const hashPassword = await hash(password+pepper);
        return hashPassword;
        
    } catch (error:any) {
        throw new error(error.message)
    }

} 
export async function verifyHash(password:string, hash:string): Promise<boolean> {
    const pepper:string = process.env.pepper || 'iAlsoForgotThePepper';
    if (await verify(hash,password+pepper)) {
        return true;
    } else {
        return false;
    }
}