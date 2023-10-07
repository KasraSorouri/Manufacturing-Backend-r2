import roleServices from '../services/roles';
import { Request, Response } from 'express';
import { ExtendedRequest } from '../types';

const getAllRoles = async (_req: Request, res: Response) => {
  try{
    const roles = await roleServices.getAllRoles();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: 'No role found' });
  }
};

const getRole = async (req: ExtendedRequest, res: Response)=> {
  const id = req.params.id;
  try {
    const role = await roleServices.getRole(Number(id));
    res.json(role);
  } catch (err) {
    res.status(404).json({ error: 'Role not found' });
  }
};

const addRole = async (req: ExtendedRequest, res: Response) => {
  const roleData: unknown = req.body;
  try {
    const newRole = await roleServices.createRole(roleData);
    res.status(201).json(newRole);
  } catch (err) {
    res.status(409).json({ error: `${err}` });
  }
};
/*
const editRole = async (req: ExtendedRequest, res: Response) => {
  const id = Number(req.params.id);
  if (!(req.decodedToken && id === req.decodedToken.id || req.permited)) {
    res.status(401).json({ error: 'Operation not allowed' });
  }
  const roleData = req.body;
  try {
    const newRole = await roleServices.updateRole({ id, roleData });
    delete newRole.dataValues.password;
    res.status(200).json(newRole.dataValues);
  } catch (err) {
    res.status(409).json({ error: `${err}` });
  }
};

const assignRoles = async (req: ExtendedRequest, res: Response) => {
  const id = req.params.id;
  const roles = req.body;
  try {
    const resulat = await roleServices.updateRoleRoles(id,roles);
    res.json(resulat);
  } catch (err) {
    res.status(409).json({ error: `${err}` });
  }
};
*/
export default {
  getAllRoles,
  getRole,
  addRole,
  //editRole,
  //assignRoles
};