import express from 'express';
import orderController from '../controllers/orderController';
import { jwtCheck, jwtParse } from '../middleware/auth';

const router =express.Router();

// 
router.post('/',  jwtCheck,jwtParse,orderController.addOrder);
router.get('/', jwtCheck,jwtParse,orderController.getAllOrders);
router.get('/user-orders',jwtCheck, jwtParse,orderController.getUserWiseOrders);
router.delete('/',jwtCheck,jwtParse, orderController.removeOrder);
router.put('/', jwtCheck, jwtParse, orderController.updateOrder);

// 
export default router;