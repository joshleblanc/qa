import { Accounts } from "meteor/accounts-base";
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  "user.create"(email:string, password:string) {
    const userCount = Meteor.users.find({}).count();
    Accounts.createUser({
      email,
      password,
      username: `User #${userCount.toString().padStart(6, "0")}`
    });
  }
});