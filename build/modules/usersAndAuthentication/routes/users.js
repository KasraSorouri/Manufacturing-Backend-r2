"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../controllers/users"));
const midwares_1 = require("../utils/midwares");
const router = express_1.default.Router();
// Get Users
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', users_1.default.getAllUsers);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', users_1.default.getUser);
// Create User
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', midwares_1.tokenExtractor, (0, midwares_1.roleAuthority)(['ADMIN']), users_1.default.addUser);
// Edit User
//router.put('/:id', tokenExtractor, roleAuthority(['ADMIN']), userControllers.editUser);
// Assign Roles
//router.post('/:id/roles', tokenExtractor, roleAuthority(['ADMIN']) , userControllers.assignRoles);
exports.default = router;
