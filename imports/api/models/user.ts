import yup from 'yup';
import { Mongo } from 'meteor/mongo';

export interface User {
  _id?: string;
  email: string;
  password: string;
  desc?: string;
  username?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = yup.object().shape({
  email: yup.string().email('Invalid email-id').required(),
  password: yup.string().required(),
  desc: yup.string().notRequired()
});

export const Users = new Mongo.Collection<User>('users');