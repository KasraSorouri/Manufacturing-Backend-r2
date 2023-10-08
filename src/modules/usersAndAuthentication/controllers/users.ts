import userServices from '../services/users';
import { Request, Response } from 'express';
import { ExtendedRequest } from '../types';
import { parseUserResponse } from '../utils/dataProcessor';

const getAllUsers = async (_req: Request, res: Response) => {
  try{
    const users = await userServices.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'No user found' });
  }
};

const getUser = async (req: ExtendedRequest, res: Response)=> {
  const id = req.params.id;
  try {
    const user = await userServices.getUser(Number(id));
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: 'User not found' });
  }
};

const addUser = async (req: ExtendedRequest, res: Response) => {
  const userData: unknown = req.body;
  try {
    const newUser = await userServices.createUser(userData);
    const result = parseUserResponse(newUser);
    res.status(201).json(result);
  } catch(err : unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};

const editUser = async (req: ExtendedRequest, res: Response) => {
  const id = Number(req.params.id);
  if (!(req.decodedToken && id === req.decodedToken.id || req.permited)) {
    res.status(401).json({ error: 'Operation not allowed' });
  }
  const userData: unknown = req.body;
  try {
    const newUser = await userServices.updateUser(id,userData);
    const result = parseUserResponse(newUser);
    res.status(201).json(result);
  } catch(err : unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};

export default {
  getAllUsers,
  getUser,
  addUser,
  editUser,
};