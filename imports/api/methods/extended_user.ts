import {Meteor} from 'meteor/meteor';

export interface ExtendedUser extends Meteor.User {
  admin?: boolean;
}

export function mutateUser(user: Meteor.User|null): ExtendedUser|null {
  return user;
}

export function isAdmin(user: Meteor.User|null): boolean {
  const mutatedUser = mutateUser(user);
  return Boolean(mutatedUser?.admin);
}