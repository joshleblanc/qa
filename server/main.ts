import { Meteor } from 'meteor/meteor';
// @ts-ignore
import { Migrations } from 'meteor/percolate:migrations';

import '/imports/api/methods/question_methods';
import '/imports/api/publications/question_publications';
import '/imports/api/publications/tag_publications';
import '/imports/api/methods/tag_methods';
import './migrations';

Meteor.startup(() => {
  Migrations.migrateTo('latest');
});