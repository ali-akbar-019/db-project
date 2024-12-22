import express from 'express'
import myFavProductsController from '../controllers/myFavProductsController';
// 

const router = express.Router();


//
router.get('/', myFavProductsController.getAllFavProducts);
router.post('/', myFavProductsController.addFavProduct);
router.delete('/', myFavProductsController.removeFromFav);
// 

//
export default router;