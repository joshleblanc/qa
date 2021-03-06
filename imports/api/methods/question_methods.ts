import {Meteor} from "meteor/meteor";
import {Questions, schema} from "/imports/api/models/questions";
import {Tags} from "/imports/api/models/tags";

Meteor.methods({
  "questions.create"(title:string, details:string, userId: string, tagIds: string[]): string {
    try {
      schema.validateSync({ title, details });
      Tags.update({
        _id: {
          $in: tagIds
        }
      }, {
        $inc: {
          usages: 1
        }
      }, {
        multi: true
      });
      return Questions.insert({
        title,
        details,
        tagIds,
        userId,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } catch(e) {
      throw new Meteor.Error(e.errors[0].message);
    }
  }
});