import Fastify,{FastifyInstance,FastifyPluginAsync} from 'fastify';
import jwt from '@fastify/jwt';
import { UserRoutes } from './routes/users.routes';
import { envToLogger, logger } from './utils/logger'
// import './custom-fastify';
// import {} from '@fastify/jwt'

export class App{
	private static fastifyInstance:FastifyInstance;
	public constructor(){
		
	}
	
	public startApp = async (portNumber: number) => {
		const jwt_secret = process.env.jwt_secret;
        this.fastifySetup(UserRoutes);
        this.plugins(jwt_secret||'it seems i forgot to add my secret');
        this.listen(portNumber);
    };
	
	private fastifySetup(userRoutesFunction: FastifyPluginAsync){
		App.fastifyInstance = Fastify({
			logger: false
		});
		//register your routes
	
		App.fastifyInstance.register(userRoutesFunction, { prefix: "/user" });
	
	}
	private plugins(jwt_secret:string){
		//register plugins
		App.fastifyInstance.register(jwt, {
			secret: jwt_secret,
			sign: {
				expiresIn: '72h'
			}
			
		});
		App.fastifyInstance.decorate("authenticate", async function(request, reply) {
			try {
			  await request.jwtVerify()
			} catch (err) {
			  reply.send(err)
			}
		  })

	
	}
	private listen(portNumber:number){
			
		App.fastifyInstance.listen({ port: portNumber }, function (err: unknown, address: string) {
			if (err) {
				logger.error(err);
				process.exit(1);
			}
			logger.info(`Server is now listening on ${address}`);
		});
	}
	

	public GetFastifyInstance(){
		return App.fastifyInstance;
	}
}
