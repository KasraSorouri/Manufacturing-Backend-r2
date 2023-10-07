import { Request, Response } from 'express';

import authService from '../services/authService';

import { UserCredentials } from '../types';
import { credentialsProcessor } from '../utils/dataProcessor';

const login = async(req: Request, res: Response): Promise<void> => {
  const credential = credentialsProcessor(req.body);
  try {
    const { token, user, firstName, lastName, roles }: UserCredentials = await authService.login(credential);
    res.status(200).send({ token, user, firstName, lastName, roles });
  } catch (err) {
    res.status(401).json({ error: 'Invalid username or password' });
  }
};

export default { login };