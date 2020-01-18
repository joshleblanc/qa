import yup from 'yup';
import { Meteor } from 'meteor/meteor';

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
  email: yup.string().email('Invalid email').required(),
  password: yup.string().min(6, "Password must be at least 6 characters").required(),
  desc: yup.string().notRequired()
});

export const Users = Meteor.users;