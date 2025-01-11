import express from 'express'
import productsController from '../controllers/productsController.js'
import { jwtCheck, jwtParse } from '../middleware/auth.js';
import multer from 'multer'
const router = express.Router();
const upload = multer({
    dest: "uploads/files", limits: {
        fileSize: 5 * 1024 * 1024
    }
})
// 

// 
router.post("/", jwtCheck, productsController.createProducts);

router.get("/", productsController.getAllProducts);
router.get("/get-category-wise-products", productsController.getCategoryWiseProducts);
router.get("/new-products", productsController.getNewProducts);

//
router.get("/:id", productsController.getSingleProduct);

// 
router.delete("/", jwtCheck, jwtParse, productsController.deleteProduct);

// 
router.put("/", jwtCheck, jwtParse, productsController.updateProduct);
// 

router.post('/upload-file', jwtCheck, upload.single("file"), productsController.uploadFile)

export default router;


