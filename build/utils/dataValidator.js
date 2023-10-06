"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringLengthCheck = exports.isNumber = exports.isBoolean = exports.isString = void 0;
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
exports.isString = isString;
const isBoolean = (value) => {
    return typeof value === 'boolean';
};
exports.isBoolean = isBoolean;
const isNumber = (value) => {
    return typeof value === 'number';
};
exports.isNumber = isNumber;
const stringLengthCheck = (text, length, subject) => {
    if (text.length < length) {
        throw new Error(`${subject} is too short, minimum length is ${length}.`);
    }
    return true;
};
exports.stringLengthCheck = stringLengthCheck;
