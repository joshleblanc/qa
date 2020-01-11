import {Meteor} from "meteor/meteor";
import {Questions} from "/imports/api/models/questions";

Meteor.publish('questions', () => {
    return Questions.find({});
});

Meteor.publish('question', id => {
    return Questions.find({ _id: id });
});