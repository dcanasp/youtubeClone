import fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { UsersSchemas } from '../dto/schemas';
import { ILogin, IRegister,JWTPayload } from '../dto/DTO';
import { UserController } from '../controller/user.controller';
import {App} from '../app';
import { logger } from '../utils/logger';

export async function UserRoutes(fastify: FastifyInstance, options: RouteShorthandOptions) {

	const userSchemas = new UsersSchemas;
	const userController = new UserController;
	const fastifyInstance = new App().GetFastifyInstance();

	fastify.post<{ Body: IRegister }>
		('/register', { schema: { body: userSchemas.RegisterSchema } }, async (request, reply) => {
			return userController.register(request.body);
		});

	fastify.post<{Body:ILogin}>
		('/login', { schema: { body: userSchemas.LoginSchema } }, async (request, reply) => {
		return userController.login(request.body);
	});
	
	fastify.get('/me', {
		onRequest: [fastifyInstance.authenticate]
	}, async (request, reply) => {

		const userPayload = request.user as JWTPayload;	
		return userController.me(userPayload.payload.username);
	});
	
	//update information
	fastify.post<{Body:Partial<IRegister>}>
	('/me', { schema: { body: userSchemas.updateSchema },onRequest: [fastifyInstance.authenticate]
	}, async (request, reply) => {		
		return userController.editUser((request.user as JWTPayload).payload.username,request.body);
	});



}