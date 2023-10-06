"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = exports.Right = exports.Role = exports.User = void 0;
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const role_1 = __importDefault(require("./role"));
exports.Role = role_1.default;
const right_1 = __importDefault(require("./right"));
exports.Right = right_1.default;
const userRoles_1 = __importDefault(require("./userRoles"));
exports.UserRoles = userRoles_1.default;
const roleRights_1 = __importDefault(require("./roleRights"));
role_1.default.belongsToMany(user_1.default, { through: userRoles_1.default, foreignKey: 'roleId' });
user_1.default.belongsToMany(role_1.default, { through: userRoles_1.default, foreignKey: 'userId' });
right_1.default.belongsToMany(role_1.default, { through: roleRights_1.default, foreignKey: 'rightId' });
role_1.default.belongsToMany(right_1.default, { through: roleRights_1.default, foreignKey: 'roleId' });
