import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { SECRET } from '../../../configs/config';

import { User, Role, Right }from '../../../models';

import { UserCredentials } from '../types';

type credentials = {
  username: string;
  password: string;
};

const login = async ({ username, password } : credentials) : Promise<UserCredentials> => {
  const user = await User.findOne({
    where: {
      username: username
    },
    include: [{
      model: Role,
      attributes: ['roleName'],
      through: { attributes: [] },
      include: [{
        model: Right,
        attributes: ['right'],
        through: { attributes: [] },
      }]
    },],
  });

  const passwordCorrect = user === null ? false
    : await bcrypt.compare(password, user.password);

  if (!user || !passwordCorrect) {
    throw new Error('invalid username or password!');
  }
  const roles = user.roles?.map((role) => role.roleName);
  const rights = user.roles?.flatMap((role) => role.rights?.map((right) => right.right));

  const userForToken = {
    username: user.username,
    roles,
    rights,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  return { token, user: user.username, firstName: user.firstName, lastName: user.lastName, roles };

};

export default{
  login
};