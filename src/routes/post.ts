import { Router } from 'express';
import validator from '../middlewares/validator';
import { loginSchema, registerSchema } from '../schemas/post';
import { auth } from '../middlewares/authenticator';
import { login, post, register } from '../controllers/post';

const router = Router();

router.post('/register', validator(registerSchema), register);
router.post('/login', validator(loginSchema), login);
router.post('/post', auth, post);

export default router;
