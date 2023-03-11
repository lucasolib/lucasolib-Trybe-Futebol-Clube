import Match from '../../database/models/MatchModel';

export default interface IMatchService {
  getAll(): Promise<Match[]>,
  finishMatch(id: number): Promise<number>
}
