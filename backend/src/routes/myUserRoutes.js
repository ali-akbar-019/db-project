import express from 'express';
import { createUser, getAllUsers, getCurrentUser, updateUser } from '../controllers/myUserController.js';
import { jwtCheck, jwtParse } from '../middleware/auth.js';

const router = express.Router();

router.post("/", createUser);
router.get("/",jwtCheck, jwtParsem, getCurrentUser );
router.get("/get-all-users", jwtParse, getAllUsers);
router.get('/update-user', jwtParse, updateUser)

export default router;