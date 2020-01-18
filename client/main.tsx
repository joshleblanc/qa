import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/App'
import '/imports/api/methods/question_methods';
import '/imports/api/methods/tag_methods';

Meteor.startup(() => {
  render(<App />, document.getElementById('react-target'));
});
