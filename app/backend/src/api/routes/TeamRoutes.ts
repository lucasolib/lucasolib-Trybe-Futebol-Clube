import { Request, Response, Router } from 'express';
import TeamService from '../services/TeamService';
import TeamController from '../controllers/TeamController';

const routerTeam = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

routerTeam.get('/teams', (req: Request, res: Response) => teamController.getAll(req, res));
routerTeam.get('/teams/:id', (req: Request, res: Response) => teamController.getById(req, res));

export default routerTeam;
