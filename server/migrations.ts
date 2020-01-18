// @ts-ignore
import {Migrations} from 'meteor/percolate:migrations';
import {Tags} from "/imports/api/models/tags";
import {Questions} from "/imports/api/models/questions";

Migrations.add({
  version: 1,
  name: "Create text indexes on the tags collection",
  up: () => {
    Tags.rawCollection().createIndex({ name: "text", description: "text" });
  },
  down: () => {
    Tags.rawCollection().dropIndex({ name: "text", description: "text" });
  }
});

Migrations.add({
  version: 2,
  name: "Add tagIds to questions",
  up: () => {
    Questions.update({}, {
      $set: {
        tagIds: []
      }
    }, { multi: true });
  },
  down: () => {
    Questions.update({}, {
      $unset: {
        tagIds: ""
      }
    }, { multi: true });
  }
});