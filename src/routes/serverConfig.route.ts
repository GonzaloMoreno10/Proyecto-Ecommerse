import { Router } from 'express';
import { serverConfigController } from '../controllers/serverConfig.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
const router = Router();

router.get('/info', tokenOrApiKeyIsValid, serverConfigController.getServerInfo);

export default router;
