import rightServices from '../services/rights';
import { Request, Response } from 'express';
import { ExtendedRequest } from '../types';

const getAllRights = async (_req: Request, res: Response) => {
  try{
    const rights = await rightServices.getAllRights();
    res.json(rights);
  } catch (err) {
    res.status(500).json({ error: 'No right found' });
  }
};

const getRight = async (req: ExtendedRequest, res: Response)=> {
  const id = req.params.id;
  try {
    const right = await rightServices.getRight(Number(id));
    res.json(right);
  } catch (err) {
    res.status(404).json({ error: 'Right not found' });
  }
};

const addRight = async (req: ExtendedRequest, res: Response) => {
  const rightData: unknown = req.body;
  try {
    const newRight = await rightServices.createRight(rightData);
    res.status(201).json(newRight);
  } catch (err) {
    res.status(409).json({ error: `${err}` });
  }
};
/*
const editRight = async (req: ExtendedRequest, res: Response) => {
  const id = Number(req.params.id);
  if (!(req.decodedToken && id === req.decodedToken.id || req.permited)) {
    res.status(401).json({ error: 'Operation not allowed' });
  }
  const rightData = req.body;
  try {
    const newRight = await rightServices.updateRight({ id, rightData });
    delete newRight.dataValues.password;
    res.status(200).json(newRight.dataValues);
  } catch (err) {
    res.status(409).json({ error: `${err}` });
  }
};

const assignRights = async (req: ExtendedRequest, res: Response) => {
  const id = req.params.id;
  const rights = req.body;
  try {
    const resulat = await rightServices.updateRightRights(id,rights);
    res.json(resulat);
  } catch (err) {
    res.status(409).json({ error: `${err}` });
  }
};
*/
export default {
  getAllRights,
  getRight,
  addRight,
  //editRight,
  //assignRights
};