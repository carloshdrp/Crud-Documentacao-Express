import express from 'express';
import exempleRouter from './routes/exempleRoute';
import userRouter from './routes/userRoute';
import articleRouter from './routes/articleRouter';
import categoryRouter from './routes/categoryRoute';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { prisma } from './database';
import userController from './controllers/userController';
import multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';

const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('dotenv').config();
if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT);

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads');
	},
	filename: function (req, file, cb) {
		let originalname = path.parse(file.originalname);
		let newFilename = originalname.name + '-' + Date.now() + originalname.ext;
		cb(null, newFilename);
	},
});

const upload = multer({ storage: storage });

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(session({ secret: 'jkgnmoe', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: any, callback: any) => {
	return callback(null, user.id);
});

passport.deserializeUser(async (id: string, callback: any) => {
	const user = await prisma.user.findUnique({
		where: { googleId: id },
	});
	if (user) {
		return callback(null, user);
	}
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/google/callback',
			scope: ['profile', 'email'],
		},
		function (accessToken: any, refreshToken: any, profile: any, cb: any) {
			// Entrou com sucesso, pode adicionar ao banco agora
			userController.create(profile);

			console.log(profile);
			return cb(null, profile);
		}
	)
);

app.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
	'/auth/google/callback',
	passport.authenticate('google', { failureRedirect: '/login' }),
	(req, res) => {
		res.redirect('http://localhost:3000/');
	}
);

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.get('/auth/logout', (req, res) => {
	if (req.user) {
		req.logout(function (err) {
			if (err) {
				console.log('Error logging out');
				return res.status(500).send('Error logging out');
			}
			console.log('success');
			return res.send('success');
		});
	} else {
		console.log('No user to log out');
		return res.send('No user to log out');
	}
});

app.use('/files', express.static(path.resolve(__dirname, '../uploads')));

app.use('/passaro', exempleRouter);
app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/article', articleRouter);

app.get('/get-user', (req, res) => {
	if (req.user) {
		return res.send(req.user);
	} else {
		return res.send('Guest');
	}
});

app.post('/file', upload.single('file'), (req, res) => {
	if (req.file) {
		res.send({ fileName: req.file.filename });
	} else {
		res.status(400).send({ error: 'No file uploaded' });
	}
});

app.delete('/file/:filename', (req, res) => {
	const filename = req.params.filename;
	const filePath = path.join('./uploads', filename);

	fs.unlink(filePath, (err) => {
		if (err) {
			console.error(err);
			res.status(500).send('Erro ao excluir o arquivo');
		} else {
			res.send('Arquivo excluído com sucesso!');
		}
	});
});

app.listen(PORT, () => {
	console.log('🚀| Server is running on port', PORT);
});
