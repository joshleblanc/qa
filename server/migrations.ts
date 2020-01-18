// @ts-ignore
import {Migrations} from 'meteor/percolate:migrations';
import {Tags} from "/imports/api/models/tags";

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