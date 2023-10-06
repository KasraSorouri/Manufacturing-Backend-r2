"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    firstName: {
        type: sequelize_1.DataTypes.TEXT,
    },
    lastName: {
        type: sequelize_1.DataTypes.TEXT
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    dateCreated: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    sequelize: db_1.sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'user'
});
exports.default = User;
