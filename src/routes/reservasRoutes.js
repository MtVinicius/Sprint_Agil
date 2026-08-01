import { Router } from 'express';
import reservasController from '../controllers/reservasController.js';

const router = Router();

router.get('/', reservasController.getReservas);
router.post('/', reservasController.postReserva);

export default router;
