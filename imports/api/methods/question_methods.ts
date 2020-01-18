import {Meteor} from "meteor/meteor";
import {Questions, schema} from "/imports/api/models/questions";
import { Tag } from "../models/tag";

Meteor.methods({
  "questions.create"(title:string, details:string, user: Meteor.User, tags: Set<Tag>): string {
    try {
      schema.validateSync({ title, details });
      return Questions.insert({
        title, details, user, tags,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } catch(e) {
      throw new Meteor.Error(e.errors[0].message);
    }
  }
});