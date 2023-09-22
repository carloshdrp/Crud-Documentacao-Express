import express from 'express';
import exempleRouter from './routes/exempleRoute';
import userRouter from './routes/userRoute';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { prisma } from './database';
import userController from './controllers/userController';
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('dotenv').config();
if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT);

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://127.0.0.1:3000', credentials: true }));
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
		res.redirect('http://127.0.0.1:3000/');
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
			console.log('sucess');
			return res.send('sucess');
		});
	} else {
		console.log('No user to log out');
		return res.send('No user to log out');
	}
});

app.use('/passaro', exempleRouter);
app.use('/user', userRouter);

app.get('/get-user', (req, res) => {
	if (req.user) {
		return res.send(req.user);
	} else {
		return res.send('Guest');
	}
});

app.listen(PORT, () => {
	console.log('🚀| Server is running on port', PORT);
});
