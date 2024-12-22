import express from 'express'
import productsController from '../controllers/productsController'
import { jwtCheck, jwtParse } from '../middleware/auth';
const router = express.Router();
// 

// 
router.post("/",jwtCheck, productsController.createProducts);

router.get("/",productsController.getAllProducts );

//
router.get("/:id", productsController.getSingleProduct);

// 
router.delete("/:id",jwtCheck,jwtParse, productsController.deleteProduct);

// 
router.put("/",jwtCheck,jwtParse, productsController.updateProduct);
// 


