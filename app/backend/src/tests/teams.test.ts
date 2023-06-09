import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('01 - Testa Teams', () => {

  afterEach(function () {
    sinon.restore();
  });

  it('para o retorno de getAll', async () => {
    const mockTeam: Team[] = [{ id: 1, teamName: 'Avaí/Kindermann'}] as Team[];
    sinon.stub(Team, 'findAll').resolves(mockTeam);
    const result = await chai.request(app).get('/teams');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(mockTeam);
  });

  it('para o retorno de getById', async () => {
    const idMock = 4;
    const mockTeam: Team = { id: 1, teamName: 'Avaí/Kindermann'} as Team;
    sinon.stub(Team, 'findByPk').resolves(mockTeam);
    const result = await chai.request(app).get(`/teams/${idMock}`);

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(mockTeam);
  });
});
