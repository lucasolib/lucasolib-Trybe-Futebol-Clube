import { ModelStatic } from 'sequelize';
import Team from '../../database/models/TeamModel';
import IMatchService from '../interfaces/IMatchService';
import MatchModel from '../../database/models/MatchModel';

export default class MatchService implements IMatchService {
  protected model: ModelStatic<MatchModel> = MatchModel;
  async getAll(): Promise<MatchModel[]> {
    const matchs = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matchs;
  }

  async finishMatch(id: number): Promise<number> {
    const match = await this.model.update({ inProgress: false }, { where: { id } });
    return match[0];
  }

  async updateMatch(id: number, payload: { homeTeamGoals: number, awayTeamGoals: number }):
  Promise<number> {
    const match = await this.model.update({ homeTeamGoals: payload.homeTeamGoals,
      awayTeamGoals: payload.awayTeamGoals }, { where: { id } });
    return match[0];
  }

  async createMatch(payload: {
    homeTeamGoals: number,
    awayTeamGoals: number,
    homeTeamId: number,
    awayTeamId: number }): Promise<MatchModel> {
    const match = await this.model.create({
      homeTeamGoals: payload.homeTeamGoals,
      homeTeamId: payload.homeTeamId,
      awayTeamGoals: payload.awayTeamGoals,
      awayTeamId: payload.awayTeamId,
      inProgress: true,
    }, { fields: ['homeTeamGoals', 'homeTeamId', 'awayTeamGoals', 'awayTeamId', 'inProgress'] });
    return match;
  }
}
