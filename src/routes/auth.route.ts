import { Router } from 'express';
import cors from 'cors';
import { authContrroller } from '../controllers/auth.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';

const router = Router();

router.use(cors());

router.post('/login', authContrroller.login);

router.get('/logout', tokenOrApiKeyIsValid, (req, res) => {
  req.session.destroy(() => {});
});

export default router;
