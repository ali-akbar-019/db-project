import express from 'express';
import orderController from '../controllers/orderController.js';
import { jwtCheck, jwtParse } from '../middleware/auth.js';

const router = express.Router();

// 
router.post('/', jwtCheck, jwtParse, orderController.addOrder);
router.get('/', jwtCheck, jwtParse, orderController.getAllOrders);
router.get('/my', jwtCheck, jwtParse, orderController.getMyOrders);
router.get('/user-orders', jwtCheck, jwtParse, orderController.markAllCartItemsOrdered);
router.delete('/', jwtCheck, jwtParse, orderController.removeOrder);
router.put('/', jwtCheck, jwtParse, orderController.updateOrder);

// 
export default router;