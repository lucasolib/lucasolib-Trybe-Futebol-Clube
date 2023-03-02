import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('01 - Testa Users', () => {
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
  eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
  SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`
  afterEach(function () {
    sinon.restore();
  });

  it('para o método Post com sucesso', async () => {
    const loginMock: ILogin ={ email: 'lucasolibatista@gmail.com', password: '123123' };
    const tokenMock = { token }
    sinon.stub(User, 'findOne').resolves();
    const result = await chai.request(app).get('/login').send(loginMock);

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(tokenMock);
  });

  it('para o método Post com falha', async () => {
    const loginMock: ILogin ={ email: 'emailFalso.com', password: 404 };
    const failedTokenMock = { message: 'Invalid email or password' }
    const result = await chai.request(app).get('/login').send(failedTokenMock);

    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.deep.equal(failedTokenMock);
  });
});
