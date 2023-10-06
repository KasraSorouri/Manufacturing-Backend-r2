"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
class UserRoles extends sequelize_1.Model {
}
UserRoles.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    roleId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'roles', key: 'id' }
    }
}, {
    sequelize: db_1.sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'userRoles'
});
exports.default = UserRoles;
