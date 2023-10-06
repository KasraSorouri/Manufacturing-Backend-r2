"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../services/users"));
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_1.default.getAllUsers();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: 'No user found' });
    }
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield users_1.default.getUser(Number(id));
        res.json(user);
    }
    catch (err) {
        res.status(404).json({ error: 'User not found' });
    }
});
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    try {
        const newUser = yield users_1.default.createUser(userData);
        //delete newUser.password;
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(409).json({ error: `${err}` });
    }
});
/*
const editUser = async (req: ExtendedRequest, res: Response) => {
  const id = Number(req.params.id);
  if (!(req.decodedToken && id === req.decodedToken.id || req.permited)) {
    res.status(401).json({ error: 'Operation not allowed' });
  }
  const userData = req.body;
  try {
    const newUser = await userServices.updateUser({ id, userData });
    delete newUser.dataValues.password;
    res.status(200).json(newUser.dataValues);
  } catch (err) {
    res.status(409).json({ error: `${err}` });
  }
};

const assignRoles = async (req: ExtendedRequest, res: Response) => {
  const id = req.params.id;
  const roles = req.body;
  try {
    const resulat = await userServices.updateUserRoles(id,roles);
    res.json(resulat);
  } catch (err) {
    res.status(409).json({ error: `${err}` });
  }
};
*/
exports.default = {
    getAllUsers,
    getUser,
    addUser,
    //editUser,
    //assignRoles
};
