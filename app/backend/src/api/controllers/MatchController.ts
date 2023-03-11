import { Request, Response } from 'express';
import IMatchService from '../interfaces/IMatchService';
import ITeamService from '../interfaces/ITeamService';

export default class MatchController {
  private _service: IMatchService;
  private _teamService: ITeamService;

  constructor(service: IMatchService, teamService: ITeamService) {
    this._service = service;
    this._teamService = teamService;
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

  async createMatch(req: Request, res: Response) {
    const payload = req.body;
    if (payload.awayTeamId === payload.homeTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const match = await this._service.createMatch(payload);
    if (typeof match === 'string') {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    return res.status(201).json(match);
  }
}
