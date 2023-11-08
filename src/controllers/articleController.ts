import { Request, Response } from 'express';
import { prisma } from '../database';
export default {
	// Criar item: >C<RUD
	async create(req: Request, res: Response) {
		try {
			const { title, file, category: categoryId, user: userId } = req.body;

			if (!title) {
				return res.json({
					error: true,
					message: 'Você precisa informar um título para a artigo',
				});
			}

			if (!categoryId) {
				return res.json({
					error: true,
					message: 'Você precisa informar uma categoria para a artigo',
				});
			}

			if (!file) {
				return res.json({
					error: true,
					message: 'Você precisa anexar um documento ao artigo!',
				});
			}

			const articleExist = await prisma.article.findFirst({
				where: { title: { equals: title, mode: 'insensitive' } },
			});

			if (articleExist) {
				return res.json({
					error: true,
					message: 'Já existe um artigo com este título!',
				});
			}

			const article = await prisma.article.create({
				data: {
					title,
					file,
					category: {
						connect: { id: categoryId },
					},
					user: {
						connect: { id: userId },
					},
				},
			});

			return res.json({
				error: false,
				message: 'Artigo criado com sucesso!',
				article,
			});
		} catch (error: any) {
			console.error(error);
			return res.status(500).json({
				error: true,
				message: 'Erro ao criar o artigo: ' + error.message,
			});
		}
	},
	// Procurar item específico: C>R<UD

	async fetch(req: Request, res: Response) {
		try {
			const { id } = req.params;

			const article = await prisma.article.findUnique({
				where: { id: Number(id) },
			});

			return res.json({ error: false, message: 'Article Find!', article });
		} catch (error: any) {
			return res.json({ error: error.message });
		}
	},

	async listByCategory(req: Request, res: Response) {
		try {
			const { id } = req.params;

			const article = await prisma.article.findMany({
				where: { categoryId: Number(id) },
			});

			return res.json({ error: false, article });
		} catch (error: any) {
			return res.json({ error: error.message });
		}
	},

	// Listar todos itens: C>R<UD
	async list(req: Request, res: Response) {
		try {
			const articles = await prisma.article.findMany();
			return res.json({
				error: false,
				articles,
			});
		} catch (error: any) {
			return res.json({
				error: error.message,
			});
		}
	},

	// Apagar um item: CRU>D<
	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const article = await prisma.article.findUnique({
				where: { id: Number(id) },
			});

			if (!article) {
				return res.json({ error: true, message: 'Invalid ID!' });
			}

			const articleDelete = await prisma.article.delete({
				where: {
					id: Number(id),
				},
			});

			return res.json({
				error: false,
				message: 'O artigo foi excluído com sucesso!',
			});
		} catch (error: any) {
			return res.send({ error: error.message });
		}
	},
};
