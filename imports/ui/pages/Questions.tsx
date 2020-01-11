import React from 'react';
import { autorun } from 'meteor/cereal:reactive-render';
import LinearProgress from "@material-ui/core/LinearProgress";
import { Meteor } from 'meteor/meteor';
import StyledPaper from "/imports/ui/components/material-ui/StyledPaper";
import { Questions } from '/imports/api/models/questions';
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import { Link } from 'react-router-dom';

@autorun
export default class QuestionList extends React.Component {
    render() {
        const loading = !Meteor.subscribe('questions').ready();
        if(loading) {
            return <LinearProgress />
        }
        const questions = Questions.find({});
        return(
            <StyledPaper>
                <List>
                    {
                        questions.map(q => (
                            <ListItem button component={Link} to={`/questions/${q._id}`} key={q._id}>
                                <ListItemText primary={q.title}/>
                            </ListItem>
                        ))
                    }
                </List>

            </StyledPaper>
        )
    }
}