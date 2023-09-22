import express from 'express';
import userController from '../controllers/userController';
const router = express.Router();

// métodos da rota
router.post('/register', userController.create);
router.get('/:id', userController.fetch);
router.post('/remove/:id', userController.delete);

export default router;
