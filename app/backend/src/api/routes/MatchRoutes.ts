import { Request, Response, Router } from 'express';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';

const routerMatch = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);

routerMatch.get('/matches', (req: Request, res: Response) => matchController.getAll(req, res));

export default routerMatch;
