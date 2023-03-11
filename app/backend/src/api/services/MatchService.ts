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
    const match = await this.model.update({ inProgress: true }, { where: { id } });
    return match[0];
  }
}
