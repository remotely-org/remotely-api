import { Router } from 'express';
import guildsRouter from './guilds'
import authRouter from './auth';

const router = Router();

router.use('/auth', authRouter);
router.use('/guilds', guildsRouter);


export default router;