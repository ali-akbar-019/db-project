import express from 'express'
import myFavProductsController from '../controllers/myFavProductsController.js';
import { jwtCheck, jwtParse } from '../middleware/auth.js';
// 

const router = express.Router();


//
router.get('/', jwtCheck, jwtParse, myFavProductsController.getAllFavProducts);
router.post('/', jwtCheck, jwtParse, myFavProductsController.addFavProduct);
router.delete('/', jwtCheck, jwtParse, myFavProductsController.removeFromFav);
// 

//
export default router;