import { Meteor } from 'meteor/meteor';
import {Tag, Tags} from "/imports/api/models/tags";
import {isAdmin} from "/imports/api/methods/extended_user";

Meteor.methods({
  "tags.quickCreate"(name) {
    if(name.length > 20) {
      throw new Meteor.Error("Tag name is too long");
    }
    const tag = Tags.findOne({ name: new RegExp(`^${name}$`, "i") });
    if(tag) {
      throw new Meteor.Error("Tag already exists");
    }

    return Tags.insert({
      name,
      description: "",
      usages: 0,
      related: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },
  "tags.update"(newTag:Tag) {
    if(!isAdmin(Meteor.user())) {
      throw new Meteor.Error("Not Authorized");
    }
    Tags.update({
      _id: newTag._id
    }, {
      $set: {
        description: newTag.description,
        name: newTag.name,
        related: newTag.related,
        usages: newTag.usages,
        updatedAt: new Date()
      }
    })
  }
});