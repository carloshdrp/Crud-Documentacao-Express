import { Request, Response, response } from 'express';
import { prisma } from '../database';
export default {
	// Criar item: >C<RUD
	async create(req: Request, res: Response) {
		try {
			const { title, content, userId } = req.body;

			const post = await prisma.post.create({
				data: {
					title,
					content,
					author: {
						connect: { id: userId },
					},
				},
			});

			return res.json({
				error: false,
				message: 'Post created with success!',
				post,
			});
		} catch (error) {}
	},
	// Procurar item específico: C>R<UD

	async fetch(req: Request, res: Response) {
		try {
			const { id } = req.params;

			const post = await prisma.post.findUnique({ where: { id: Number(id) } });

			return res.json({ error: false, message: 'Post Find!', post });
		} catch (error: any) {
			return response.json({ error: error.message });
		}
	},

	// Listar todos itens: C>R<UD
	async list(res: Response) {
		try {
			const posts = await prisma.post.findMany();
			return res.json({
				error: false,
				posts,
			});
		} catch (error: any) {
			return response.json({
				error: error.message,
			});
		}
	},

	// Atualizar um item: CR>U<D
	async update(req: Request, res: Response) {
		try {
			const { id, title, content } = req.body;
			const post = await prisma.post.findUnique({ where: { id: Number(id) } });

			if (!post) {
				return res.json({ error: true, message: 'Invalid ID!' });
			}

			if (!title && !content) {
				return res.json({
					error: true,
					message: 'You need update something!',
				});
			}

			const postUpdate = await prisma.post.update({
				where: {
					id: Number(req.body.id),
				},
				data: {
					title,
					content,
				},
			});

			return res.json({
				error: false,
				message: 'The post has been updated with success!',
			});
		} catch (error: any) {
			return res.json({ error: error.message });
		}
	},

	// Apagar um item: CRU>D<
	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const post = await prisma.post.findUnique({
				where: { id: Number(id) },
			});

			if (!post) {
				return res.json({ error: true, message: 'Invalid ID!' });
			}

			const postDelete = await prisma.post.delete({
				where: {
					id: Number(id),
				},
			});

			return res.json({
				error: false,
				message: 'The post has been deleted with success!',
			});
		} catch (error: any) {
			return res.send({ error: error.message });
		}
	},
};
