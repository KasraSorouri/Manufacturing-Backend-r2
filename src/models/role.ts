import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

import { sequelize } from '../configs/db';
import Right from './right';

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  addRights(_rights: Right[]) {
    throw new Error('Method not implemented.');
  }
  setRights(_arg0: never[]) {
    throw new Error('Method not implemented.');
  }
  declare id: CreationOptional<number>;
  declare roleName: string;
  declare active: boolean;
  declare rights?: CreationOptional<Right[]>;
}

Role.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roleName: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  active: {
    type: DataTypes.BOOLEAN
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'role'
});

export default Role;