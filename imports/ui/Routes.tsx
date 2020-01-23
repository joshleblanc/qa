import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import { Questions } from "/imports/ui/pages/Questions";
import { Ask } from "/imports/ui/pages/Ask";
import { Question } from '/imports/ui/pages/Question';
import { CurrentProfile } from './pages/CurrentProfile';
import Tags from "/imports/ui/pages/Tags";

export default () => {
  return(
    <Switch>
      <Route path={"/questions/:id"} component={Question} />
      <Route path={"/questions"} component={Questions} />
      <Route path={"/tags"} component={Tags} />
      <Route path={"/ask"} component={Ask} />
      {/* Profile page for currently logged in user. */}
      <Route path={"/profile"} component={CurrentProfile} />
      <Redirect to={"/questions"} />
    </Switch>
  );
}