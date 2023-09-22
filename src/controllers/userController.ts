import { Request, Response } from 'express';
import { prisma } from '../database';

export default {
	async create(profile: any) {
		const alreadyExist = await prisma.user.findUnique({
			where: {
				googleId: profile.id,
			},
		});

		if (!alreadyExist) {
			await prisma.user.create({
				data: {
					googleId: profile.id,
					name: profile.name.givenName,
					email: profile.emails[0].value,
					avatar: profile.photos[0].value,
				},
			});
		}
	},

	async fetch(req: Request, res: Response) {
		try {
			const { id } = req.params;

			const user = await prisma.user.findUnique({ where: { id: Number(id) } });

			return res.json({ error: false, message: 'User Find!', user });
		} catch (error: any) {
			return res.json({ error: error.message });
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const user = await prisma.user.findUnique({
				where: { id: Number(id) },
			});

			if (!user) {
				return res.json({ error: true, message: 'Invalid ID!' });
			}

			const userDelete = await prisma.user.delete({
				where: {
					id: Number(id),
				},
			});

			return res.json({
				error: false,
				message: 'The user has been removed with success!',
			});
		} catch (error: any) {
			return res.send({ error: error.message });
		}
	},
};
