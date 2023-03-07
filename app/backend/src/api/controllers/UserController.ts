import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
import genToken from '../middlewares/JWT';
import IUserService from '../interfaces/IUserService';

export default class UserController {
  private _service: IUserService;

  constructor(service: IUserService) {
    this._service = service;
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    try {
      if (!/\S+@\S+.\S+/.test(email) || password.length < 6) throw new Error();
      const user = await this._service.login(email);
      if (await compare(password, user.password)) {
        const token = await genToken(email);
        console.log('teste');
        return res.status(200).json({ token });
      } throw new Error();
    } catch {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  }
}
