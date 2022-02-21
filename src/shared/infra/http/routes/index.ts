import { Router } from 'express';

// import { ensureAuthenticated } from '../middlewares/ensureAuthenticate';
import { authenticateRoutes } from './authenticate.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';
import { carsRoutes } from './cars.routes';

const router = Router();

router.use(authenticateRoutes);

// router.use(ensureAuthenticated);

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use('/cars', carsRoutes);

export { router };
