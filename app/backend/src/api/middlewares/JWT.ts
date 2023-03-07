import jwt = require('jsonwebtoken');

require('dotenv/config');

const secret = process.env.JWT_SECRET || 'jwt_secret';

const genToken = async (email:string) => {
  const token = jwt
    .sign({ data: { email } }, secret, { expiresIn: '12h', algorithm: 'HS256' });
  return token;
};

export default genToken;
