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

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const match = await this._service.finishMatch(Number(id));
    return res.status(200).json(match);
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const payload = req.body;
    const match = await this._service.updateMatch(Number(id), payload);
    return res.status(200).json(match);
  }
}
