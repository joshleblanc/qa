import {Meteor} from "meteor/meteor";
import {Questions} from "/imports/api/models/questions";
import {Tags} from "/imports/api/models/tags";

Meteor.publish('questions', () => {
  return Questions.find({});
});

Meteor.publish('question', function(id) {
  const question = Questions.findOne({_id: id});
  if (question) {
    return [
      Questions.find({_id: id}),
      Tags.find({_id: {$in: question.tagIds}}),
      Meteor.users.find({ _id: question.userId })
    ]
  } else {
      this.ready();
  }
});