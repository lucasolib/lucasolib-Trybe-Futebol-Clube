import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';
import Team from '../database/models/TeamModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('01 - Testa Teams', () => {
  it('para o retorno de getAll', async () => {
    const mockTeam: Team[] = [{ id: 1, teamName: 'Avaí/Kindermann'}] as Team[];
    sinon.stub(Model, 'findAll').resolves(mockTeam);
    const result = await chai.request(app).get('/teams');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(mockTeam);
  });
});
