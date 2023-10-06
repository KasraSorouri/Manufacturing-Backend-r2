import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

import { sequelize } from '../configs/db';

class Right extends Model<InferAttributes<Right>, InferCreationAttributes<Right>> {
  declare id: CreationOptional<number>;
  declare right: string;
  declare relatedModule: string;
}

Right.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  right: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  relatedModule: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'right'
});

export default Right;