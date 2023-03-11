import Match from '../../database/models/MatchModel';

export default interface IMatchService {
  getAll(): Promise<Match[]>,
  finishMatch(id: number): Promise<number>,
  updateMatch(id: number,
    payload: { homeTeamGoals: number, awayTeamGoals: number }): Promise<number>;
  createMatch(payload: {
    homeTeamGoals: number,
    awayTeamGoals: number,
    homeTeamId: number,
    awayTeamId: number }): Promise<Match>;
}
