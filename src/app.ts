import Fastify from 'fastify';
import { userRoutes } from './routes/users';
import {envToLogger,logger} from './utils/logger'

export const App = async (portNumber: number) => {
  // const fastify = Fastify({ logger });

  const fastify = Fastify({
    //@ts-ignore
    // logger: envToLogger[environment] ?? true
    logger: false
  });  
  
  fastify.register(userRoutes, { prefix: "/user" });
  
  fastify.listen({ port: portNumber }, function (err:unknown, address:string) {
    if (err) {
      logger.error(err);
      process.exit(1);
    }
    logger.info(`Server is now listening on ${address}`);
  });
};
