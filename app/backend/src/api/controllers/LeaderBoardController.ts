import { Response, Request } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  private _leaderBoardService: LeaderBoardService;

  constructor(_leaderBoardService: LeaderBoardService) {
    this._leaderBoardService = _leaderBoardService;
  }

  public async getHomeLeaderBoard(_req: Request, res: Response) {
    const leaderBoard = await this._leaderBoardService.homeLeaderboard();
    return res.status(200).json(leaderBoard);
  }

  public async getAwayLeaderBoard(_req: Request, res: Response) {
    const leaderBoard = await this._leaderBoardService.awayLeaderboard();
    return res.status(200).json(leaderBoard);
  }
}
