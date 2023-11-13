import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
	const categoria1 = await prisma.category.upsert({
		where: { id: 1 },
		update: {},
		create: {
			name: 'Categoria 1',
		},
	});

	const categoria2 = await prisma.category.upsert({
		where: { id: 2 },
		update: {},
		create: {
			name: 'Categoria 2',
		},
	});

	const categoria3 = await prisma.category.upsert({
		where: { id: 3 },
		update: {},
		create: {
			name: 'Categoria 3',
		},
	});

	const categoria4 = await prisma.category.upsert({
		where: { id: 4 },
		update: {},
		create: {
			name: 'Categoria 4',
		},
	});

	const categoria5 = await prisma.category.upsert({
		where: { id: 5 },
		update: {},
		create: {
			name: 'Categoria 5',
		},
	});
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
