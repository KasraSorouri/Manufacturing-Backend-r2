import { User, Role, Right, UserQuery } from '../../../models';
import { NewUser, UserWithRights } from '../types';
import { parseUserResponse, userProcessor } from '../utils/dataProcessor';

// Define user query 
const query : UserQuery = {
  attributes : { exclude: ['password', 'userRoles'] },
  include: [{
    model: Role,
    as: 'roles',
    attributes: ['roleName'],
    through: {
      attributes: []
    },
    include: [{
      model: Right,
      as: 'rights',
      attributes: ['right'],
      through: {
        attributes: []
      },
    }]
  }]
};

// Get All users
const getAllUsers = async(): Promise<UserWithRights[]> => {

  const users = await User.findAll(query);
  
  const result: UserWithRights[] = [];
  users.map(user => {
    result.push(parseUserResponse(user));
  });
  return result;
};

// Get a user based on ID
const getUser = async(id: number): Promise<UserWithRights> => {
  const user = await User.findByPk(id,query);
  if (!user) {
    throw new Error ('the user not found');
  }
  
  const result = parseUserResponse(user);
  return result;
};

// Create a new user
const createUser = async (userData: unknown): Promise<User> => {
  const newUserData = await userProcessor(userData);
  if ('password' in newUserData) {
    try {
      const newUser = await User.create(newUserData as NewUser);
      if ('roles' in newUserData && newUserData.roles && newUserData.roles.length > 0) {
        const { roles } = newUserData; 
        await updateUserRoles(newUser.id, roles);
      }
      return newUser;
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
*/
const updateUserRoles = async (id: number, roles: number[]): Promise<UserWithRights> => {

  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('user not found');
  }
  user.setRoles([]);
  const okRoles = await Role.findAll({ where: { id: [...roles], active: true } });
  if (okRoles.length === 0) {
    throw new Error('no Active role found');
  }
  try {
    user.addRoles(okRoles);
    const createdUser = await User.findByPk(id,query);

    if (!createdUser) {
      throw new Error ('the user not found');
    }
    const result = parseUserResponse(createdUser);

    return result;
  } catch (err) {
    let errorMessage = 'Something went wrong. Check user\'s roles again';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

export default {
  getAllUsers,
  getUser,
  createUser,
  //updateUser,
  //updateUserRoles
};