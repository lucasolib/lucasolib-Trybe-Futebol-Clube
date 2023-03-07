import { NextFunction, Request, Response } from 'express';
import jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class validateJWT {
  public static verifyJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    } try {
      req.body.jwt = jwt.verify(token, secret as string);
    } catch {
      return res.status(401).json({ message: 'Token must be a valid token' });
    } return next();
  }
}
