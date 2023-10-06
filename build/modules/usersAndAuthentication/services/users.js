"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../../models");
const userProcessor_1 = require("../utils/userProcessor");
// Get All users
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield models_1.User.findAll({
        attributes: { exclude: ['password', 'userRoles'] },
        include: {
            model: models_1.Role,
            attributes: ['roleName'],
            through: {
                attributes: []
            }
        }
    });
    const result = users.map(user => ({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        active: user.active,
        roles: user.roles ? user.roles.map(role => role.roleName) : [],
    }));
    return result;
});
// Get a user based on ID
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const user = yield models_1.User.findByPk(id, {
        attributes: { exclude: ['password', 'userRoles'] },
        include: [{
                model: models_1.Role,
                attributes: ['roleName'],
                through: {
                    attributes: []
                },
                include: [{
                        model: models_1.Right,
                        through: {
                            attributes: []
                        },
                    }]
            },
        ]
    });
    if (!user) {
        throw new Error('the user not found');
    }
    const result = {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        active: user.active,
        roles: (_a = user.roles) === null || _a === void 0 ? void 0 : _a.map(role => role.roleName),
        rights: ((_c = (_b = user.roles) === null || _b === void 0 ? void 0 : _b.flatMap(role => { var _a; return (_a = role.rights) === null || _a === void 0 ? void 0 : _a.map(right => right.right); })) !== null && _c !== void 0 ? _c : []).filter((right) => typeof right === 'string')
    };
    return result;
});
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield (0, userProcessor_1.userProcessor)(userData);
    if ('password' in newUser) {
        try {
            const user = yield models_1.User.create(newUser);
            //if ('roles' in newUser) {
            //  updateUserRoles({ id : user.id, roles: userData.roles })
            //}
            return user;
        }
        catch (err) {
            let errorMessage = 'Something went wrong.';
            if (err instanceof Error) {
                errorMessage += ' Error: ' + err.message;
            }
            throw new Error(errorMessage);
        }
    }
    else {
        throw new Error('Incorrect or missing data!');
    }
});
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
exports.default = {
    getAllUsers,
    getUser,
    createUser,
    //updateUser,
    //updateUserRoles
};
