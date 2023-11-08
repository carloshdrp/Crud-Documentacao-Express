import { Request, Response } from 'express';
import { prisma } from '../database';
export default {
	// Criar item: >C<RUD
	async create(req: Request, res: Response) {
		try {
			const { name } = req.body;

			if (!name) {
				return res.json({
					error: true,
					message: 'Você precisa informar um nome para a categoria',
				});
			}

			const categoryExists = await prisma.category.findFirst({
				where: { name: { equals: name, mode: 'insensitive' } },
			});

			if (categoryExists) {
				return res.json({
					error: true,
					message: 'Essa categoria já existe!',
				});
			}

			const category = await prisma.category.create({
				data: {
					name,
				},
			});

			return res.json({
				error: false,
				message: 'Categoria criada com sucesso!',
				category,
			});
		} catch (error: any) {
			return res.json({ error: error.message });
		}
	},

	// Listar todos itens: C>R<UD
	async list(req: Request, res: Response) {
		try {
			const categories = await prisma.category.findMany();
			console.log(categories);
			return res.json({
				error: false,
				categories,
			});
		} catch (error: any) {
			return res.json({
				error: error.message,
			});
		}
	},

	async fetch(req: Request, res: Response) {
		try {
			const { id } = req.params;

			const category = await prisma.category.findUnique({
				where: { id: Number(id) },
			});

			return res.json({ error: false, message: 'Category Find!', category });
		} catch (error: any) {
			return res.json({ error: error.message });
		}
	},

	// Atualizar um item: CR>U<D
	async update(req: Request, res: Response) {
		try {
			const { id } = req.query;
			console.log(id);
			const { name } = req.body;
			const category = await prisma.category.findUnique({
				where: { id: Number(id) },
			});

			if (!category) {
				return res.json({ error: true, message: 'Invalid ID!' });
			}

			if (!name) {
				return res.json({
					error: true,
					message: 'Você precisa informar um número',
				});
			}

			const exist = await prisma.category.findFirst({
				where: { name: { equals: name, mode: 'insensitive' } },
			});

			if (exist) {
				return res.json({
					error: true,
					message: 'Essa categoria já existe!',
				});
			}

			const categoryUpdate = await prisma.category.update({
				where: {
					id: Number(id),
				},
				data: {
					name,
				},
			});

			return res.json({
				error: false,
				message: 'Categoria atualizada com sucesso!',
			});
		} catch (error: any) {
			return res.json({ error: error.message });
		}
	},

	// Apagar um item: CRU>D<
	async delete(req: Request, res: Response) {
		try {
			const { id } = req.query;
			const category = await prisma.category.findUnique({
				where: { id: Number(id) },
			});

			if (!category) {
				return res.json({ error: true, message: 'Invalid ID!' });
			}

			const categoryDelete = await prisma.category.delete({
				where: {
					id: Number(id),
				},
			});

			return res.json({
				error: false,
				message: 'The category has been deleted with success!',
			});
		} catch (error: any) {
			return res.send({ error: error.message });
		}
	},
};
