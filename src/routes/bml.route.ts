import { Router } from 'express';
import { bmlController } from '../controllers/bml.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { postBmlValidator } from '../validators/bmlValidator';

export const bmlRouter = Router();

bmlRouter.get('/', tokenOrApiKeyIsValid, bmlController.get);

bmlRouter.post('/', tokenOrApiKeyIsValid, postBmlValidator, bmlController.set);
