import { ModelStatic } from 'sequelize';
import ITeamService from '../interfaces/ITeamService';
import Team from '../../database/models/TeamModel';

export default class TeamService implements ITeamService {
  async getAll(): Promise<Team[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  protected model: ModelStatic<Team> = Team;
}
