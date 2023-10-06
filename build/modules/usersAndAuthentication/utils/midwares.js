"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rightAuthority = exports.roleAuthority = exports.tokenExtractor = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../configs/config");
const tokenExtractor = (req, res, next) => {
    const authorization = req.get('Authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            req.decodedToken = jsonwebtoken_1.default.verify(authorization.substring(7), config_1.SECRET);
        }
        catch (_a) {
            res.status(401).json({ error: 'token invalid!' });
        }
    }
    else {
        res.status(401).json({ error: 'token missing!' });
    }
    next();
};
exports.tokenExtractor = tokenExtractor;
//Authenticated based on Roles
const roleAuthority = (permitedRoles) => {
    return (req, res, next) => {
        if (!req.decodedToken) {
            return res.status(401).json({ error: 'Token not found!' });
        }
        // Check if the decodedToken has a 'roles' property and it's an array of strings
        if (!Array.isArray(req.decodedToken.roles) || req.decodedToken.roles.some(role => typeof role !== 'string')) {
            res.status(401).json({ error: 'Invalid roles in token!' });
        }
        const decodedToken = req.decodedToken.roles;
        // Convert user roles to UpperCase
        const userRoles = decodedToken.roles.map(role => role.toUpperCase());
        // Check if any role matches the accepted roles
        const hasRole = permitedRoles.some(role => userRoles.includes(role));
        if (!hasRole) {
            res.status(401).json({ error: 'Operation not allowed for This user' });
        }
        req.permited = true;
        return next();
    };
};
exports.roleAuthority = roleAuthority;
//Authenticated based on Right
const rightAuthority = (permitedRights) => {
    return (req, res, next) => {
        if (!req.decodedToken) {
            return res.status(401).json({ error: 'Token not found!' });
        }
        // Check if the decodedToken has a 'roles' property and it's an array of strings
        if (!Array.isArray(req.decodedToken.rights) || req.decodedToken.rights.some(right => typeof right !== 'string')) {
            res.status(401).json({ error: 'Invalid right in token!' });
        }
        const decodedToken = req.decodedToken.rights;
        // Convert user roles to UpperCase
        const userRights = decodedToken.rights.map(right => right.toUpperCase());
        // Check if any role matches the accepted roles
        const hasRight = permitedRights.some(right => userRights.includes(right));
        if (!hasRight) {
            res.status(401).json({ error: 'This user has not sufficient  rights' });
        }
        req.permited = true;
        return next();
    };
};
exports.rightAuthority = rightAuthority;
