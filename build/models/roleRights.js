"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
class RoleRights extends sequelize_1.Model {
}
RoleRights.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roleId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'roles', key: 'id' }
    },
    rightId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'rights', key: 'id' }
    }
}, {
    sequelize: db_1.sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'roleRights'
});
exports.default = RoleRights;
