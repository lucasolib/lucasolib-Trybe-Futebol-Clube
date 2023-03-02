import Team from '../../database/models/TeamModel';

export default interface ITeamService {
  getAll(): Promise<Team[]>
  getById(id: number): Promise<Team>
}
