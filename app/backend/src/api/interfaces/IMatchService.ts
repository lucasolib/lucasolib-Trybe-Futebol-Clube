import Match from '../../database/models/MatchModel';

export default interface IMatchService {
  getAll(): Promise<Match[]>

}
