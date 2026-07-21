import { Router } from 'express';
import { getGames, addGame, removeGame } from '../controllers/gameController.js';
import { validateToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getGames);
router.post('/', validateToken, addGame); // 🔒 Ruta protegida
router.delete('/:id', validateToken, removeGame); // 🔒 Ruta protegida para eliminar

export default router;