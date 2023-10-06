"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const info = (...params) => {
    if (process.env.NODE_ENV !== 'test1') {
        params.forEach((param) => {
            if (typeof param === 'string') {
                console.log(param);
            }
            else if (typeof param === 'object') {
                console.log(JSON.stringify(param, null, 2));
            }
        });
    }
};
exports.default = {
    info,
};
