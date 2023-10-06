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
const authService_1 = __importDefault(require("../services/authService"));
const userProcessor_1 = require("../utils/userProcessor");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const credential = (0, userProcessor_1.credentialsProcessor)(req.body);
    try {
        const { token, user, firstName, lastName, roles } = yield authService_1.default.login(credential);
        res.status(200).send({ token, user, firstName, lastName, roles });
    }
    catch (err) {
        res.status(401).json({ error: 'Invalid username or password' });
    }
});
exports.default = { login };
