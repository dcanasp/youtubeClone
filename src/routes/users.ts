import fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { UsersSchemas } from '../dto/schemas';
import { IRegister } from '../dto/userDTO';
import { UserController } from '../controller/user.controller';

export async function userRoutes(fastify: FastifyInstance, options: RouteShorthandOptions) {
	const userSchemas = new UsersSchemas;
	const userController = new UserController;

	fastify.post<{ Body: IRegister }>
		('/register', { schema: { body: userSchemas.RegisterSchema } }, async (request, reply) => {
			return userController.register(request.body);
		});

	fastify.post('/login', async (request, reply) => {
		return { hello: 'world' };
		//todo search how validation and jwt works on fastify
	});

	fastify.get('/me', async (request, reply) => {
		return { hello: 'world' };
	});
	//update information
	fastify.get('/:id([0-9]+)', async (request, reply) => {
		return { hello: 'world' };
	});
	fastify.post('/:id([0-9]+)', async (request, reply) => {
		return { hello: ':id post' };
	});



}
