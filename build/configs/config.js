"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET = exports.PORT = exports.DATABASE_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT;
exports.PORT = PORT;
const DATABASE_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URI
    : process.env.DATABASE_URI;
exports.DATABASE_URI = DATABASE_URI;
const SECRET = 'secret*secret*secret';
exports.SECRET = SECRET;
