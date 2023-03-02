import { ModelStatic } from 'sequelize';
import ITeamService from '../interfaces/ITeamService';
import Team from '../../database/models/TeamModel';

export default class TeamService implements ITeamService {
  protected model: ModelStatic<Team> = Team;
  async getAll(): Promise<Team[]> {
    const teams = await this.model.findAll();
    console.log(teams);
    return teams;
  }
}
