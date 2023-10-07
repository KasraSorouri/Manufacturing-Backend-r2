import { Request } from 'express'; 
import { JwtPayload } from 'jsonwebtoken';

export interface ExtendedRequest extends Request {
  decodedToken?: JwtPayload  | {id: string | number, roles?: string[], rights?: string[]},
  permited?: boolean
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  active: boolean;
  roles?: Role[];
}

export interface Role {
  id: number;
  roleName: string;
  active: boolean;
  rights?: Right[];
}

export interface RoleWithRights extends Omit<Role, 'rights'> {
  rights?: string[];
}

export interface Right {
  id: number;
  right: string;
  relatedModule: string;
}

export interface UserWithRights extends Omit<User, 'roles'> {
  roles?: string[];
  rights?: string[];
} 

export interface UserData extends Omit<User,'id' | 'roles' | 'rights'> {
  password?: string;
  roles?: number[];
  rights?: number[];
}

export interface NewUser extends Omit<UserData, 'roles' | 'rights'> {
  password: string;
}

export type Credential = {
  username: string,
  password: string
};

export type UserCredentials = {
  token: string,
  user: string,
  firstName?: string,
  lastName?: string,
  roles?: string[]
};

export type Token = {
  id: number,
  username: string,
  roles?: string[],
  rights?: string[],
};

export interface NewRole extends Omit<Role,'id' | 'rights'> {
  rights?: number[];
}

export type NewRight = Omit<Right,'id'>; 