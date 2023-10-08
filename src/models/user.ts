import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../configs/db'; 
import Role from './role';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  active: boolean;
  dateCreated?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  
  public id!: number;
  public username!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public active!: boolean;
  public dateCreated?: Date;
  public readonly roles?: Role[];
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
    dateCreated: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'User',
  }
);

export default User;
