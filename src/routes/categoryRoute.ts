import express from 'express';
import categoryController from '../controllers/categoryController';
const router = express.Router();

// métodos da rota
router.get('/', categoryController.list);
router.get('/:id', categoryController.fetch);
router.post('/new', categoryController.create);
router.put('/update', categoryController.update);
router.delete('/delete', categoryController.delete);

export default router;
