import express from 'express'
import myCartController from '../controllers/myCartController';
import { jwtCheck, jwtParse } from '../middleware/auth';

const router = express.Router();

// 
router.get('/',jwtCheck,jwtParse, myCartController.getCart);
router.post('/',jwtCheck,jwtParse, myCartController.addCartProduct);
router.delete('/',jwtCheck,jwtParse,myCartController.deleteFromCart);
router.put('/',jwtCheck,jwtParse, myCartController.editFromCart);

export default router;