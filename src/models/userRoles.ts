import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';

class UserRoles extends Model {
  public userId!: number;
  public roleId!: number;
}

UserRoles.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'roles', key: 'id' }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'userRoles'
});

export default UserRoles;