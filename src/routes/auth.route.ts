import { Router } from 'express';
import cors from 'cors';
import { authContrroller } from '../controllers/auth.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { emptyBodyValidator } from '../validators/emptyBody.validator';

const router = Router();

router.use(cors());

router.post('/login', emptyBodyValidator, authContrroller.login);

router.get('/logout', tokenOrApiKeyIsValid, (req, res) => {
  req.session.destroy(() => {});
});

export default router;
