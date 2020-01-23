import { Meteor } from 'meteor/meteor';
import {searchTagsByName, Tags} from "/imports/api/models/tags";

Meteor.publish('tags', () => {
  return Tags.find({}, { limit: 36, skip: 0, sort: { usages: 1 } });
});

Meteor.publish("tags.search", (query:string, limit = undefined, skip = 0) => {
    return searchTagsByName(query, limit, skip);
  }
);

Meteor.publish("tags.byIds", (ids:string[]) => {
  return Tags.find({
    _id: {
      $in: ids
    }
  })
});