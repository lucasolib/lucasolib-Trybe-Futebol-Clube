import { Request, Response, Router } from 'express';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';
import validateJWT from '../middlewares/validateJWT';

const routerMatch = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);

routerMatch.get('/matches', (req: Request, res: Response) => matchController.getAll(req, res));
routerMatch.patch(
  '/matches/:id/finish',
  validateJWT.verifyJWT,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);
routerMatch.patch(
  '/matches/:id',
  validateJWT.verifyJWT,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

export default routerMatch;
