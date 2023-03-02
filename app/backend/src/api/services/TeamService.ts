import { ModelStatic } from 'sequelize';
import ITeamService from '../interfaces/ITeamService';
import Team from '../../database/models/TeamModel';

export default class TeamService implements ITeamService {
  protected model: ModelStatic<Team> = Team;
  async getAll(): Promise<Team[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async getById(id: number): Promise<Team> {
    const team = await this.model.findByPk(id);
    return team as Team;
  }
}
