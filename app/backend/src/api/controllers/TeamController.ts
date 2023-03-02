import { Request, Response } from 'express';
import ITeamService from '../interfaces/ITeamService';

export default class TeamController {
  private _service: ITeamService;

  constructor(service: ITeamService) {
    this._service = service;
  }

  async getAll(_req: Request, res: Response) {
    const teams = await this._service.getAll();
    return res.status(200).json(teams);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const numberId = Number(id);
    const team = await this._service.getById(numberId);
    return res.status(200).json(team);
  }
}
