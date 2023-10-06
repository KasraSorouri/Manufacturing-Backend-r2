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
exports.credentialsProcessor = exports.userProcessor = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dataValidator_1 = require("../../../utils/dataValidator");
const parseUsername = (username) => {
    if (!(0, dataValidator_1.isString)(username) || !(0, dataValidator_1.stringLengthCheck)(username, 3, 'username')) {
        throw new Error('Incorrect username!');
    }
    return username;
};
const parseFirstName = (firstName) => {
    if (!(0, dataValidator_1.isString)(firstName)) {
        throw new Error('Incorrect firstName!');
    }
    return firstName;
};
const parseLastName = (lastName) => {
    if (!(0, dataValidator_1.isString)(lastName)) {
        throw new Error('Incorrect lastName!');
    }
    return lastName;
};
const parseActive = (active) => {
    if (!active || !(0, dataValidator_1.isBoolean)(active)) {
        throw new Error('Incorrect or missing data!');
    }
    return active;
};
const parsePassword = (password) => {
    if (!password || !(0, dataValidator_1.isString)(password) || !(0, dataValidator_1.stringLengthCheck)(password, 6, 'password')) {
        throw new Error('Incorrect password!');
    }
    return password;
};
const passwordHashMaker = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRound = 10;
    const passwordhash = bcrypt_1.default.hash(password, saltRound);
    return passwordhash;
});
const parseRoles = (array) => {
    if (!Array.isArray(array)) {
        throw new Error('Roles should be Array!');
    }
    if (!array || typeof array !== 'object') {
        throw new Error('Incorrect or Missing data!');
    }
    const roles = [];
    array.forEach(element => {
        (0, dataValidator_1.isNumber)(element) ? roles.push(element) : null;
    });
    return roles;
};
const userProcessor = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userData || typeof userData !== 'object') {
        throw new Error('Incorrect or missing Data!');
    }
    if ('username' in userData && 'firstName' in userData && 'lastName' in userData) {
        const newUser = {
            username: parseUsername(userData.username),
            firstName: parseFirstName(userData.firstName),
            lastName: parseLastName(userData.lastName),
            active: 'active' in userData ? parseActive(userData.active) : false,
        };
        if ('password' in userData) {
            newUser.password = yield passwordHashMaker(parsePassword(userData.password));
        }
        if ('roles' in userData) {
            newUser.roles = parseRoles(userData.roles);
        }
        return newUser;
    }
    else {
        throw new Error('Data is missing');
    }
});
exports.userProcessor = userProcessor;
const credentialsProcessor = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect username or password!');
    }
    if ('username' in object && 'password' in object && (0, dataValidator_1.isString)(object.username) && (0, dataValidator_1.isString)(object.password)) {
        const credential = {
            username: object.username,
            password: object.password
        };
        return credential;
    }
    throw new Error('Incorrect username or password!');
};
exports.credentialsProcessor = credentialsProcessor;
