import fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { UsersSchemas,VideosSchemas } from '../dto/schemas';
import { ILogin, IRegister,JWTPayload,IVideo,StreamParams} from '../dto/DTO';
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

	fastify.get<{ Params: StreamParams }>('/streamFromServer/:uuid',{},async (request, reply) => {
		const uuid = request.params.uuid;
		// const videoUrl = await videoController.findUrl(uuid);
		// if (videoUrl.success == false){
		// 	return videoUrl
		// }
		// //@ts-ignore
		// const videoStream = await videoController.download(videoUrl.videoUrl)

		const mpdFilePath = videoController.getMPDFilePath(uuid); // Function to find the MPD file path based on UUID

		if (!mpdFilePath) {
			reply.code(404).send('MPD file not found');
			return;
		}

		// reply.type('application/dash+xml').sendFile(mpdFilePath);
		// return videoController.stream(uuid);
	});

	fastify.get<{ Params: StreamParams }>('/loadBalancer',{},async (request, reply) => {

		return {success: "Works from typescript!"}
	});


}