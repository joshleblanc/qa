import { Meteor } from 'meteor/meteor';
// @ts-ignore
import { Migrations } from 'meteor/percolate:migrations';

import '/imports/api/methods/question_methods';
import '/imports/api/publications/question_publications';
import '/imports/api/publications/tag_publications';
import '/imports/api/publications/user_publications';
import '/imports/api/methods/tag_methods';
import './migrations';
import { Accounts } from 'meteor/accounts-base';
import { ExtendedUser } from '/imports/api/methods/extended_user';

Meteor.startup(() => {
  Migrations.migrateTo('latest');
});

Accounts.onCreateUser((options, user: ExtendedUser) => {
  user.admin = false;

  return user;
});