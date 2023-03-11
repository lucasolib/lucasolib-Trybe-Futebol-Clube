import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import IMatch from '../api/interfaces/IMatch';

chai.use(chaiHttp);

const { expect } = chai;

describe('01 - Testa Matches', () => {

  afterEach(function () {
    sinon.restore();
  });

  it('para rota GET retornando a lista de partidas', async () => {
    const mockTeams: MatchModel[] = [{
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: false,
      }] as MatchModel[];
    sinon.stub(MatchModel, 'findAll').resolves(mockTeams);
    const result = await chai.request(app).get('/matches');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(mockTeams);
  });
});