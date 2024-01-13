import fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { UsersSchemas,VideosSchemas } from '../dto/schemas';
import { ILogin, IRegister,JWTPayload,IVideo } from '../dto/DTO';
import { UserController } from '../controller/user.controller';
import { VideoController } from '../controller/video.controller';
import {App} from '../app';
import { logger } from '../utils/logger';

export async function VideosRoutes(fastify: FastifyInstance, options: RouteShorthandOptions) {

	const videosSchemas= new VideosSchemas;
	const videoController = new VideoController;
	const fastifyInstance = new App().GetFastifyInstance();

	fastify.post<{ Body: IVideo }>
		('/', { schema: { body:  videosSchemas.VideoSchema},
            onRequest: [fastifyInstance.authenticate]
        }, async (request, reply) => {
			const userPayload = (request.user as JWTPayload).payload
			return videoController.upload(userPayload.userId,userPayload.username,request.body);
		});


}