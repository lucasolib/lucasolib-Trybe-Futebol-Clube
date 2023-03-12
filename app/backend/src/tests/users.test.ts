import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';
import ILogin from '../api/interfaces/ILogin';
import JWT from '../api/middlewares/JWT';

chai.use(chaiHttp);

const { expect } = chai;

describe('02 - Testa Users', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIn0sImlhdCI6MTY3ODIwNDEzMiwiZXhwIjoxNjc4MjQ3MzMyfQ.ofqcxZJPhT526jcf1Zl4XrKjTDJDkcVJcIzywpQl6sY';
  afterEach(function () {
    sinon.restore();
  });

  it('para o método Post com sucesso', async () => {
    const loginMock: ILogin ={ email: 'admin@admin.com', password: 'secret_admin' };
    sinon.stub(User, 'findOne').resolves({
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    } as User);
    const result = await chai.request(app).post('/login').send(loginMock);
    expect(result.status).to.be.equal(200);
  });

  it('para o método Post com falha de email e senha inválidos', async () => {
    const loginMock: ILogin ={ email: 'emailFalso.com', password: '404' };
    const failedTokenMock = { message: 'Invalid email or password' }
    const result = await chai.request(app).post('/login').send(loginMock);

    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.deep.equal(failedTokenMock);
  });

  it('para o método Post com falha de email e senha inexistentes', async () => {
    const loginMock: ILogin ={ email: 'emailFalso@gmail.com', password: '404404' };
    const failedTokenMock = { message: 'Invalid email or password' }
    const result = await chai.request(app).post('/login').send(loginMock);

    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.deep.equal(failedTokenMock);
  });

  it('para o método Post com senha inexistente', async () => {
    const loginMock: { email: string } ={ email: 'emailFalso@gmail.com' };
    const failedTokenMock = { message: 'All fields must be filled' }
    const result = await chai.request(app).post('/login').send(loginMock);

    expect(result.status).to.be.equal(400);
    expect(result.body).to.be.deep.equal(failedTokenMock);
  });

  it('para o método Post com falha devido a senha inválida', async () => {
    const loginMock: ILogin ={ email: 'admin@admin.com', password: 'testee' };
    const failedTokenMock = { message: 'Invalid email or password' }
    sinon.stub(User, 'findOne').resolves({
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    } as User);
    const result = await chai.request(app).post('/login').send(loginMock);
    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.deep.equal(failedTokenMock);
  });

  it('para o método Get Role com sucesso', async () => {
    const loginMock: ILogin ={ email: 'admin@admin.com', password: 'secret_admin' };
    const login = await chai.request(app).post('/login').send(loginMock);
    const result = await chai.request(app).get('/login/role').set('authorization', login.body.token);

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal({ role: 'admin' })
  });

  it('para o método Get Role sem o token', async () => {
    const result = await chai.request(app).get('/login/role')

    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.deep.equal({ message: 'Token not found'})
  });

  it('para o método Get Role com token falso', async () => {
    const result = await chai.request(app).get('/login/role').set('authorization', 'tokenfalso');

    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.deep.equal({ message: 'Token must be a valid token' })
  });
});
