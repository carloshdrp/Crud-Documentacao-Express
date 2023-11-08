import express from 'express';
import articleController from '../controllers/articleController';
const router = express.Router();

router.get('/', articleController.list);
router.get('/category/:id', articleController.listByCategory);
router.get('/:id', articleController.fetch);
router.post('/new', articleController.create);
router.delete('/delete/:id', articleController.delete);

export default router;
