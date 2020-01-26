import { Meteor } from "meteor/meteor";

// Dorime. 🙏

// @ts-ignore
Meteor.publish(null, function() {
  // @ts-ignore
  return Meteor.users.find(this.userId, {
    fields: {
      _id: 1,
      emails: 1,
      username: 1,
      admin: 1
    }
  });
});