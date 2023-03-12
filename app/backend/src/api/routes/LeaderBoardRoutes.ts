import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';
import LeaderBoardService from '../services/LeaderBoardService';

const routerLeaderBoard = Router();
const service = new LeaderBoardService();
const controller = new LeaderBoardController(service);

routerLeaderBoard.get('/leaderboard/home', (req, res) => controller.getHomeLeaderBoard(req, res));
routerLeaderBoard.get('/leaderboard/away', (req, res) => controller.getAwayLeaderBoard(req, res));
routerLeaderBoard.get('/leaderboard', (req, res) => controller.getLeaderBoard(req, res));

export default routerLeaderBoard;
