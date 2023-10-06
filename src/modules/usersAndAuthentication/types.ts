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
}

export interface Role {
  id: number;
  roleName: string;
  active: boolean;
  rights: string[];
}

export interface Right {
  id: number;
  right: string;
  relatedModule: string;
}

export interface UserWithRole extends User {
  roles?: string[];
} 

export interface UserWithRights extends User {
  roles?: string[];
  rights?: string[];
} 

export interface UserData extends Omit<User,'id'> {
  password?: string;
  roles?: number[];
  rights?: number[];
}

export interface NewUser extends Omit<UserData,'roles'> {
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