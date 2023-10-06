"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
class Right extends sequelize_1.Model {
}
Right.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    right: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    relatedModule: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize: db_1.sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'right'
});
exports.default = Right;
