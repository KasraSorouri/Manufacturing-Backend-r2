import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

import { sequelize } from '../configs/db';
import Role from './role';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare password: string;
  declare firstName: string;
  declare lastName: string;
  declare active: boolean;
  declare roles?: Role[];
  declare dateCreated : CreationOptional<Date>;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  firstName: {
    type: DataTypes.TEXT,
  },
  lastName: {
    type: DataTypes.TEXT
  },
  active: {
    type: DataTypes.BOOLEAN
  },
  dateCreated: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user'
});

export default User;