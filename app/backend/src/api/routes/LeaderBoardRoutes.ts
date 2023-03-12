import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';
import LeaderBoardService from '../services/LeaderBoardService';

const routerLeaderBoard = Router();
const service = new LeaderBoardService();
const controller = new LeaderBoardController(service);

routerLeaderBoard.get('/leaderboard/home', (req, res) => controller.getLeaderBoardHome(req, res));

export default routerLeaderBoard;
