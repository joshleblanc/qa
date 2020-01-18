import { Meteor } from 'meteor/meteor';
import {searchTagsByName, Tags} from "/imports/api/models/tags";

Meteor.publish("tags.search", (query:string) => {
    return searchTagsByName(query);
  }
);

Meteor.publish("tags.byIds", (ids:string[]) => {
  return Tags.find({
    _id: {
      $in: ids
    }
  })
});