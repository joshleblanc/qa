import {Meteor} from 'meteor/meteor';

export interface ExtendedUser extends Meteor.User {
  admin?: boolean;
}

export function isAdmin(user: ExtendedUser|null): boolean {
  return Boolean(user?.admin);
}