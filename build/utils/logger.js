"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const info = (message) => {
    if (process.env.NODE_ENV !== 'test1') { // eslint-disable-next-line no-console
        console.log(message);
    }
};
exports.default = {
    info,
};
