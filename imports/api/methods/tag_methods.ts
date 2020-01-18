import { Meteor } from 'meteor/meteor';
import {Tags} from "/imports/api/models/tags";

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
      related: []
    });
  }
});