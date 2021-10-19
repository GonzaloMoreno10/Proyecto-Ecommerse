import { Router } from 'express';
import { userController } from '../controllers/users.controller';
import asyncHandler from 'express-async-handler';
const router = Router();

router.get('/:id?', asyncHandler(userController.getUsers));

export default router;
