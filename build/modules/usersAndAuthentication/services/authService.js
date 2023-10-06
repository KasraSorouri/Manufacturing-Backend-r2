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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../../../configs/config");
const models_1 = require("../../../models");
const login = ({ username, password }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const user = yield models_1.User.findOne({
        where: {
            username: username
        },
        include: [{
                model: models_1.Role,
                attributes: ['roleName'],
                through: { attributes: [] },
                include: [{
                        model: models_1.Right,
                        attributes: ['right'],
                        through: { attributes: [] },
                    }]
            },],
    });
    const passwordCorrect = user === null ? false
        : yield bcrypt_1.default.compare(password, user.password);
    if (!user || !passwordCorrect) {
        throw new Error('invalid username or password!');
    }
    const roles = (_a = user.roles) === null || _a === void 0 ? void 0 : _a.map((role) => role.roleName);
    const rights = (_b = user.roles) === null || _b === void 0 ? void 0 : _b.flatMap((role) => { var _a; return (_a = role.rights) === null || _a === void 0 ? void 0 : _a.map((right) => right.right); });
    const userForToken = {
        username: user.username,
        roles,
        rights,
        id: user.id,
    };
    const token = jsonwebtoken_1.default.sign(userForToken, config_1.SECRET);
    return { token, user: user.username, firstName: user.firstName, lastName: user.lastName, roles };
});
exports.default = {
    login
};
