import { Request, Response, Router } from 'express';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';
import validateJWT from '../middlewares/validateJWT';

const routerUser = Router();
const userService = new UserService();
const userController = new UserController(userService);

routerUser.post('/login', (req: Request, res: Response) =>
  userController.login(req, res));
routerUser.get('/login/role', validateJWT.verifyJWT, userController.getRole);

export default routerUser;
