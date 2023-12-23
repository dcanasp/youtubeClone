import Fastify,{FastifyInstance,FastifyPluginAsync,FastifyServerOptions} from 'fastify';
import jwt from '@fastify/jwt';
import fastifyMultipart from '@fastify/multipart';
import fs from 'fs';
import { UserRoutes } from './routes/users.routes';
import { VideosRoutes } from './routes/video.routes';
import { envToLogger, logger } from './utils/logger'
// import './custom-fastify';
// import {} from '@fastify/jwt'

export class App{
	private static fastifyInstance:FastifyInstance;
	public constructor(){

		// const httpsOptions: FastifyServerOptions = {
			// https: {
			//   allowHTTP1: true, // fallback support for HTTP1
			//   key: fs.readFileSync('../cert/server-private-key.pem'),
			//   cert: fs.readFileSync('../cert/server-certificate.crt'),
			//   ca: fs.readFileSync('../cert/ca-certificate.crt'),
			//   requestCert: true, // Request a certificate from clients
			//   rejectUnauthorized: true // clients need to provide a valid certificate
			// },
		// 	logger: false
		//   };
	  
		//   App.fastifyInstance = Fastify(httpsOptions);
		
	}
	
	public startApp = async (portNumber: number) => {
		const jwt_secret = process.env.jwt_secret;
        this.plugins(jwt_secret||'it seems i forgot to add my secret');
        this.listen(portNumber);
		this.routes();// las rutas deben estar despues de los plugins
	};
	
	private plugins(jwt_secret:string){
		App.fastifyInstance = Fastify({
			https:{
				// allowHTTP1: true, // fallback support for HTTP1
				key: fs.readFileSync('./cert/server-private-key.pem'),
				cert: fs.readFileSync('./cert/server-certificate.crt'),
				ca: fs.readFileSync('./cert/ca-certificate.crt'),
				requestCert: true, // Request a certificate from clients
				rejectUnauthorized: true // clients need to provide a valid certificate  
			},
			logger: false
		});
		//register plugins
		App.fastifyInstance.register(jwt, {
			secret: jwt_secret,
			sign: {
				expiresIn: '72h'
			}
			
		});
		App.fastifyInstance.register(fastifyMultipart, {
			attachFieldsToBody: true,
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
	
	private routes(){
		//register your routes
		App.fastifyInstance.register(UserRoutes, { prefix: "/user" });
		App.fastifyInstance.register(VideosRoutes, { prefix: "/videos" });
	}
	public GetFastifyInstance(){
		return App.fastifyInstance;
	}
}
