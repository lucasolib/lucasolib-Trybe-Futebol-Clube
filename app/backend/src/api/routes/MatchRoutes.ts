import { Request, Response, Router } from 'express';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';
import validateJWT from '../middlewares/validateJWT';
import TeamService from '../services/TeamService';

const routerMatch = Router();
const matchService = new MatchService();
const teamService = new TeamService();
const matchController = new MatchController(matchService, teamService);

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
routerMatch.post(
  '/matches',
  validateJWT.verifyJWT,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

export default routerMatch;
