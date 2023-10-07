import { User, Role, Right } from '../../../models';
import { NewUser, UserWithRights, UserWithRole } from '../types';
import  { userProcessor } from '../utils/dataProcessor';

// Get All users
const getAllUsers = async(): Promise<UserWithRole[]> => {
  const users = await User.findAll({
    attributes : { exclude: ['password', 'userRoles'] },
    include: {
      model: Role,
      attributes: ['roleName'],
      through: {
        attributes: []
      }
    }
  });
  
  const result: UserWithRole[] = users.map(user => ({
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName, 
    active: user.active,
    roles: user.roles ? user.roles.map(role => role.roleName) : [],
  }));
  return result;
};

// Get a user based on ID
const getUser = async(id: number): Promise<UserWithRights> => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password', 'userRoles'] },
    include: [{
      model: Role,
      attributes: ['roleName'],
      through: {
        attributes: []
      },
      include: [{
        model: Right,
        through: {
          attributes: [] 
        },
      }]
    },
  ]
  });
  if (!user) {
    throw new Error ('the user not found');
  }
  
  const result: UserWithRights = {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName, 
    active: user.active,
    roles: user.roles?.map(role => role.roleName),
    rights: (user.roles?.flatMap(role => role.rights?.map(right => right.right))?? []).filter((right): right is string => typeof right === 'string')
  };
  return result;
};

// Create a new user
const createUser = async (userData: unknown): Promise<User> => {
  const newUser = await userProcessor(userData);
  if ('password' in newUser ) {
    try {
      const user = await User.create(newUser as NewUser);
      //if ('roles' in newUser) {
      //  updateUserRoles({ id : user.id, roles: userData.roles })
      //}
      return user;
    } catch(err : unknown) {
      let errorMessage = 'Something went wrong.';
      if (err instanceof Error) {
        errorMessage += ' Error: ' + err.message;
      }
      throw new Error(errorMessage);
    }
  } else {
    throw new Error('Incorrect or missing data!');
  }
  
};
/*
const updateUser = async ({ id, userData }) => {
  const newData = await userProcessor(userData)

  try {
    const user = await User.findByPk(id)
    await user.update(newData)
    if (userData.roles.length > 0) {
      updateUserRoles({ id : user.id, roles: userData.roles })
    }
    return user
  } catch(err) {
    throw new Error(err.original.detail)
  }
}

const updateUserRoles = async ({ id, roles }) => {

  const user = await User.findByPk(id)
  if (!user) {
    throw new Error('user not found')
  }
  await user.setRoles([])
  const okRoles = await Role.findAll({ where: { id: [...roles], active: true } })
  if (okRoles.length === 0) {
    throw new Error('no Active role found')
  }
  try {
    await user.addRoles(okRoles)
    const result = await User.findByPk(id,{
      attributes : { exclude: ['password', 'userRoles'] },
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
    throw new Error('Something wrong happend, Check user\'s roles again')
  }
}
*/
export default {
  getAllUsers,
  getUser,
  createUser,
  //updateUser,
  //updateUserRoles
};