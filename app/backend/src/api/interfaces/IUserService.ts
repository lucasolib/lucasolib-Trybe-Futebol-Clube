import User from '../../database/models/UserModel';

export default interface ITeamService {
  login(email: string): Promise<User>
}
