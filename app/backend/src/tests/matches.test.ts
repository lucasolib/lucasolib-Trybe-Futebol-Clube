import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import ILogin from '../api/interfaces/ILogin';

chai.use(chaiHttp);

const { expect } = chai;

describe('03 - Testa Matches', () => {

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

  it('para rota PATCH finalizando uma partida', async () => {
    const loginMock: ILogin ={ email: 'admin@admin.com', password: 'secret_admin' };
    const login = await chai.request(app).post('/login').send(loginMock);
    sinon.stub(MatchModel, 'update').resolves([0]);
    const result = await chai.request(app).patch('/matches/1/finish').set('authorization', login.body.token);
    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.equal(0);
  });

  it('para rota PATCH atualizando uma partida', async () => {
    const loginMock: ILogin ={ email: 'admin@admin.com', password: 'secret_admin' };
    const login = await chai.request(app).post('/login').send(loginMock);
    sinon.stub(MatchModel, 'update').resolves([0]);
    const result = await chai.request(app).patch('/matches/1').set('authorization', login.body.token);
    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.equal(0);
  });

  it('para rota CREATE criando uma partida com ids iguais', async () => {
    const loginMock: ILogin ={ email: 'admin@admin.com', password: 'secret_admin' };
    const matchCreateMock = { homeTeamId: 8,
    awayTeamId: 8,
    homeTeamGoals: 2,
    awayTeamGoals: 2 }
    const login = await chai.request(app).post('/login').send(loginMock);
    const result = await chai.request(app)
    .post('/matches')
    .set('authorization', login.body.token)
    .send(matchCreateMock);
    expect(result.status).to.be.equal(422);
    expect(result.body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
  });

  it('para rota CREATE criando uma partida com ids inexistentes', async () => {
    const loginMock: ILogin ={ email: 'admin@admin.com', password: 'secret_admin' };
    const matchCreateMock = { homeTeamId: 22222222222,
    awayTeamId: 1111111111,
    homeTeamGoals: 2,
    awayTeamGoals: 2 }
    const login = await chai.request(app).post('/login').send(loginMock);
    const result = await chai.request(app)
    .post('/matches')
    .set('authorization', login.body.token)
    .send(matchCreateMock);
    expect(result.status).to.be.equal(404);
    expect(result.body).to.be.deep.equal({ message: 'There is no team with such id!' });
  });

  it('para rota CREATE criando uma partida', async () => {
    const loginMock: ILogin ={ email: 'admin@admin.com', password: 'secret_admin' };
    const matchCreateMock = { homeTeamId: 16,
    awayTeamId: 8,
    homeTeamGoals: 2,
    awayTeamGoals: 2 }
    const login = await chai.request(app).post('/login').send(loginMock);
    sinon.stub(MatchModel, 'create').resolves({
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 2,
      awayTeamId: 8,
      awayTeamGoals: 2,
      inProgress: true,
    } as MatchModel);
    const result = await chai.request(app)
    .post('/matches')
    .set('authorization', login.body.token)
    .send(matchCreateMock);
    expect(result.status).to.be.equal(201);
    expect(result.body).to.be.deep.equal({
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 2,
      awayTeamId: 8,
      awayTeamGoals: 2,
      inProgress: true,
    });
  });
});