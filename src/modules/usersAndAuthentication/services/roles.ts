import { Role, Right } from '../../../models';
import { RoleWithRights } from '../types';
import { roleProcessor } from '../utils/dataProcessor';

// Get All roles
const getAllRoles = async(): Promise<RoleWithRights[]> => {
  const roles = await Role.findAll({
    include: {
      model: Right,
      through: {
        attributes: []
      }
    }
  });
 
  const result: RoleWithRights[] = roles.map(role => ({
    id: role.id,
    roleName: role.roleName,
    active: role.active,
    rights: role.rights ? role.rights.map(role => role.right) : [],
  }));
  return result;
};

// Get a role based on ID
const getRole = async(id: number): Promise<RoleWithRights> => {
  const role = await Role.findByPk(id, {
    include: [{
      model: Right,
      through: {
        attributes: []
      },
    },
  ]
  });
  if (!role) {
    throw new Error ('the role not found');
  }
  
  const result: RoleWithRights = {
    id: role.id,
    roleName: role.roleName,
    active: role.active,
    rights: role.rights?.map(right => right.right),
  };
  return result;
};

// Create a new role
const createRole = async (roleData: unknown): Promise<Role> => {
  const newRoleData = roleProcessor(roleData);
  const { roleName, active } = newRoleData;
    try {
      const newRole = await Role.create({ roleName, active });
      //if ('roles' in newRole) {
      //  updateRoleRoles({ id : role.id, roles: roleData.roles })
      //}
      return newRole;
    } catch(err : unknown) {
      let errorMessage = 'Something went wrong.';
      if (err instanceof Error) {
        errorMessage += ' Error: ' + err.message;
      }
      throw new Error(errorMessage);
    } 
};
/*
const updateRole = async ({ id, roleData }) => {
  const newData = await roleProcessor(roleData)

  try {
    const role = await Role.findByPk(id)
    await role.update(newData)
    if (roleData.roles.length > 0) {
      updateRoleRoles({ id : role.id, roles: roleData.roles })
    }
    return role
  } catch(err) {
    throw new Error(err.original.detail)
  }
}

const updateRoleRoles = async ({ id, roles }) => {

  const role = await Role.findByPk(id)
  if (!role) {
    throw new Error('role not found')
  }
  await role.setRoles([])
  const okRoles = await Role.findAll({ where: { id: [...roles], active: true } })
  if (okRoles.length === 0) {
    throw new Error('no Active role found')
  }
  try {
    await role.addRoles(okRoles)
    const result = await Role.findByPk(id,{
      attributes : { exclude: ['password', 'roleRoles'] },
      include: {
        model: Role,
        attributes: ['roleName'],
        through: {
          attributes: []
        },
        include: {
          model: Right,
          attributes: ['right'],
          through: {
            attributes: []
          },
        }
      }
    })
    return result
  } catch (err) {
    throw new Error('Something wrong happend, Check role\'s roles again')
  }
}
*/
export default {
  getAllRoles,
  getRole,
  createRole,
  //updateRole,
  //updateRoleRoles
};