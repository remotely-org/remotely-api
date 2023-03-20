import { Router } from 'express';
import passport from 'passport';
import { getGuildsController } from '../../controllers/guilds';
import { isAuthenticated } from '../../utils/middlewares';

const router = Router();

//middleware is called in order
router.get("/", isAuthenticated, getGuildsController)

export default router;