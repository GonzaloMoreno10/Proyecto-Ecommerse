import { Router } from 'express';
import { serverConfigController } from '../controllers/serverConfig.controller';
const router = Router();

router.get('/info', serverConfigController.getServerInfo);

export default router;
