import {Meteor} from "meteor/meteor";
import {Questions, schema} from "/imports/api/models/questions";

Meteor.methods({
  "questions.create"(title:string, details:string) {
    try {
      schema.validateSync({ title, details });
      Questions.insert({
        title, details,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } catch(e) {
      throw new Meteor.Error(e.errors[0].message);
    }
  }
});