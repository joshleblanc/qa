import * as React from 'react';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
// @ts-ignore
import { autorun } from 'meteor/cereal:reactive-render';
import { Meteor } from 'meteor/meteor';

@autorun
export default class extends React.Component {
    render() {
        if(Meteor.user()) {
            return <Button color="inherit" component={Link} to={'/profile'}>Profile</Button>
        } else {
            return <Button color="inherit" component={Link} to={'/register'}>Register</Button>
        }
    }
}