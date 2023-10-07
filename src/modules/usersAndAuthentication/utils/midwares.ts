import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express'; 

import { SECRET } from '../../../configs/config';
import { Token } from '../types';

interface ExtendedRequest extends Request {
  decodedToken?: JwtPayload | Token,
  permited?: boolean
}


const tokenExtractor = (req: ExtendedRequest, res: Response, next: NextFunction): void => {
  const authorization = req.get('Authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET) as JwtPayload;
    } catch {
        res.status(401).json({ error: 'token invalid!' });
    }
  } else {
      res.status(401).json({ error: 'token missing!' });
  }
  next();
};

//Authenticated based on Roles
const roleAuthority  = (permitedRoles: string[]) => {
  return (req: ExtendedRequest, res: Response, next: NextFunction) => {

    if (!req.decodedToken) {
      return res.status(401).json({ error: 'Token not found!' });
    }
    
    const decodedToken: Token = req.decodedToken as Token;
    
    // Check if the decodedToken has a 'roles' property and it's an array of strings
    if (!Array.isArray(decodedToken.roles) || decodedToken.roles.some(role => typeof role !== 'string')) {
      res.status(401).json({ error: 'Invalid roles in token!' });
    }

    // Convert user roles to UpperCase
    const userRoles = decodedToken.roles?.map(role => role.toUpperCase());

    if (!userRoles || userRoles.length < 1) {
      throw new Error('Invalid roles in token!');
    }

    // Check if any role matches the accepted roles
    const hasRole = permitedRoles.some(role => userRoles.includes(role));

    if (!hasRole) {
      res.status(401).json({ error: 'Operation not allowed for This user' });
    }
    req.permited = true;

    return next();
  };
};

//Authenticated based on Right
const rightAuthority  = (permitedRights: string[]) => {
  return (req: ExtendedRequest, res: Response, next: NextFunction) => {

    if (!req.decodedToken) {
      return res.status(401).json({ error: 'Token not found!' });
    }
    
    const decodedToken: Token = req.decodedToken as Token;

    // Check if the decodedToken has a 'roles' property and it's an array of strings
    if (!Array.isArray(decodedToken.rights) || decodedToken.rights.some(right => typeof right !== 'string')) {
      res.status(401).json({ error: 'Invalid right in token!' });
    }
    // Convert user roles to UpperCase
    const userRights = decodedToken.rights?.map(right => right.toUpperCase());

    if (!userRights || userRights.length < 1) {
      throw new Error('Invalid roles in token!');
    }

    // Check if any role matches the accepted roles
    const hasRight = permitedRights.some(right => userRights.includes(right));

    if (!hasRight) {
      res.status(401).json({ error: 'This user has not sufficient  rights' });
    }
    req.permited = true;

    return next();
  };
};

export {
  tokenExtractor,
  roleAuthority,
  rightAuthority
};