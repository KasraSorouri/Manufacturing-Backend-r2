import { User, Role, Right, UserQuery } from '../../../models';
import { NewUser, UpdateUser, UserWithRights } from '../types';
import { parseUserResponse, userProcessor } from '../utils/dataProcessor';

// Define User query 
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

// Get all Users
const getAllUsers = async(): Promise<UserWithRights[]> => {

  const users = await User.findAll(query);
  
  const result: UserWithRights[] = [];
  users.map(user => {
    result.push(parseUserResponse(user));
  });
  return result;
};

// Get a User based on ID
const getUser = async(id: number): Promise<UserWithRights> => {
  const user = await User.findByPk(id,query);
  if (!user) {
    throw new Error ('the user not found');
  }
  
  const result = parseUserResponse(user);
  return result;
};

// Create a new User
const createUser = async (userData: unknown): Promise<User> => {
  const newUserData = await userProcessor(userData);

  if ('password' in newUserData) {
    try {
      const newUser = await User.create(newUserData as NewUser);
      if ('roles' in newUserData && newUserData.roles) {
        const { roles } = newUserData; 
        const updatedUser = await updateUserRoles(newUser.id, roles);
        return updatedUser;
       } else {
        return newUser;
      }
    } catch(err : unknown) {
      let errorMessage = '';
      if (err instanceof Error) {
        errorMessage += ' Error: ' + err.message;
      }
      throw new Error(errorMessage);
    }
  } else {
    throw new Error('Incorrect or missing data!');
  }
};

// Update an User
const updateUser = async (id: number, userData: unknown): Promise<User>=> {
  const newUserData = await userProcessor(userData);
  try {
    const user = await User.findByPk(id);
    if(!user) {
      throw new Error('User not found!');
    }
    await user.update(newUserData as UpdateUser);
    if ('roles' in newUserData && newUserData.roles) {
      const { roles } = newUserData; 
      const updatedUser = await updateUserRoles(id, roles);
      return updatedUser;
     } else {
      return user;
    }
  } catch(err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

// Assign Roles to a User
const updateUserRoles = async (id: number, roles: number[]): Promise<User> => {

  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('user not found');
  }
  
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call */
await (user as any).setRoles([]);
  const okRoles = await Role.findAll({ where: { id: [...roles], active: true } });
  try {

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call */
await (user as any).addRoles(okRoles);
    const updatedUser = await User.findByPk(id,query);
    if (!updatedUser) {
      throw new Error ('the user not found');
    }
    return updatedUser;
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
  updateUser,
};