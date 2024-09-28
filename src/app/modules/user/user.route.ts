import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidations.userValidationSchema),
  UserControllers.createUser,
);

router.get(
  '/all-users',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getAllUsers,
);

export const UserRoutes = router;
