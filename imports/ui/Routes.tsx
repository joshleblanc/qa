import React from 'react';
import { Route, Switch }  from 'react-router-dom';
import Questions from "/imports/ui/pages/Questions";
import Ask from "/imports/ui/pages/Ask";
import Question from '/imports/ui/pages/Question';

export default () => {
    return(
        <Switch>
            <Route path={"/questions/:id"} component={Question} />
            <Route path={"/questions"} component={Questions} />
            <Route path={"/ask"} component={Ask} />
        </Switch>
    )
}