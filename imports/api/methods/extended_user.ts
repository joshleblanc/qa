import {Meteor} from 'meteor/meteor';

export interface ExtendedUser extends Meteor.User {
  admin?: boolean;
}

export function mutateUser(user: Meteor.User|null): ExtendedUser|null {
  return user;
}