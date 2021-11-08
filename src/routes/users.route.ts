import { Router } from 'express';
import { userController } from '../controllers/users.controller';
import asyncHandler from 'express-async-handler';
const router = Router();

router.post('/login');

router.post('/singin', asyncHandler(userController.createUser));

router.get('/', asyncHandler(userController.getUsers));

export default router;
