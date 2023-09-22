import express from 'express';
import { middlewareGlobal } from '../middleware/middlewareGlobal';
const router = express.Router();

// middleware exclusivo da rota
router.use((req, res, next) => {
	var date_ob = new Date(Date.now());
	var dia = date_ob.getDate();
	var mes = date_ob.getMonth() + 1;
	var ano = date_ob.getFullYear();
	var hora = date_ob.getHours();
	var min = date_ob.getMinutes();
	var sec = date_ob.getSeconds();

	console.log('Middleware da rota Pássaro:');
	console.log(hora + ':' + min + ':' + sec, dia + '/' + mes + '/' + ano);
	console.log('------------------------------');
	next();
});

// métodos da rota
router.get('/', middlewareGlobal, (req, res) => {
	res.send('pássaros');
});

export default router;
