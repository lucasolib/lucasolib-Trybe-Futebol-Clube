import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';
import TeamModel from '../database/models/TeamModel';
import TeamService from '../api/services/TeamService';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const mockTeam: TeamModel[] = [new TeamModel({
  id: 1,
  teamName: 'Flamengo',
})]

describe('01 - Testa Teams', () => {
  beforeEach(() => {
    sinon.stub(Model, 'findAll').resolves(mockTeam);
  })

  afterEach(() => {
    (TeamModel.findAll as sinon.SinonStub).restore();
  })

  it('para o retorno de getAll', async () => {
    const teamService = new TeamService();
    const data = await teamService.getAll();

    chai.expect(data).to.be.equal(mockTeam);
  });
});
