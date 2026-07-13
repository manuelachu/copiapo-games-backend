import { Router } from 'express';
import { getGames, addGame } from '../controllers/gameController.js';
import { validateToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getGames);
router.post('/', validateToken, addGame); // 🔒 Ruta protegida

export default router;