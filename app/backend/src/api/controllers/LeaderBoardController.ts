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

  public async getLeaderBoard(_req: Request, res: Response) {
    const leaderBoard = await this._leaderBoardService.Leaderboard();
    leaderBoard.sort((a, b) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.totalVictories === b.totalVictories) {
          if (a.goalsBalance === b.goalsBalance) {
            if (a.goalsFavor === b.goalsFavor) {
              return a.goalsOwn - b.goalsOwn;
            } return b.goalsFavor - a.goalsFavor;
          } return b.goalsBalance - a.goalsBalance;
        } return b.totalVictories - a.totalVictories;
      } return b.totalPoints - a.totalPoints;
    });
    return res.status(200).json(leaderBoard);
  }
}
