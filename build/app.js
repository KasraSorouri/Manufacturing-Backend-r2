"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// *** Import Routers 
// import Authentication and User Routes
const users_1 = __importDefault(require("./modules/usersAndAuthentication/routes/users"));
const login_1 = __importDefault(require("./modules/usersAndAuthentication/routes/login"));
const app = (0, express_1.default)();
app.use(express_1.default.json(), (0, cors_1.default)());
// Authentication and User Routes
app.use('/api/auth/users', users_1.default);
app.use('/api/auth/login', login_1.default);
app.get('/api/ping', (_req, res) => {
    res.send('Pong!');
});
exports.default = app;
