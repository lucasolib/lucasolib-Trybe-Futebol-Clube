import { Request, Response } from 'express';
import IMatchService from '../interfaces/IMatchService';

export default class MatchController {
  private _service: IMatchService;

  constructor(service: IMatchService) {
    this._service = service;
  }

  async getAll(req: Request, res: Response) {
    const matchs = await this._service.getAll();
    const { inProgress } = req.query;
    if (inProgress) {
      const filteredMatches = matchs.filter((match) => match.inProgress.toString() === inProgress);
      return res.status(200).json(filteredMatches);
    }
    return res.status(200).json(matchs);
  }
}
