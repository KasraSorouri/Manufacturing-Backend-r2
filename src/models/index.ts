import User from './user';
import Role from './role';
import Right from './right';
import UserRoles from './userRoles';
import RoleRights from './roleRights';

Role.belongsToMany(User, { through: UserRoles, foreignKey: 'roleId' });
User.belongsToMany(Role, { through: UserRoles, foreignKey: 'userId' });

Right.belongsToMany(Role, { through: RoleRights, foreignKey: 'rightId' });
Role.belongsToMany(Right, { through: RoleRights, foreignKey: 'roleId' });

export {
  User,
  Role,
  Right,
  UserRoles
};