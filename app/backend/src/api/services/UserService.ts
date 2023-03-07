import { ModelStatic } from 'sequelize';
import IUserService from '../interfaces/IUserService';
import User from '../../database/models/UserModel';

export default class UserService implements IUserService {
  protected model: ModelStatic<User> = User;
  async login(email: string): Promise<User> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    return user;
  }
}
