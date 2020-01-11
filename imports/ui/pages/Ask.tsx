import React from 'react';
import { autorun } from 'meteor/cereal:reactive-render';
import { schema as QuestionSchema } from '/imports/api/models/questions';
import {Field, Form, Formik, FormikHelpers} from "formik";
import { TextField } from 'formik-material-ui';
import { Meteor } from 'meteor/meteor';
import StyledPaper from "/imports/ui/components/material-ui/StyledPaper";
import Typography from "/node_modules/@material-ui/core/Typography";
import StyledButton from "/imports/ui/components/material-ui/StyledButton";
import {withSnackbar, WithSnackbarProps} from "notistack";

type Values = {
    title: string,
    details: string
}

// idk how to fix this
// @ts-ignore
@withSnackbar
@autorun
export default class Ask extends React.Component<WithSnackbarProps> {
    handleSubmit = (values:Values, form:FormikHelpers<Values>) => {
        const { enqueueSnackbar } = this.props;
        form.setSubmitting(true);
        Meteor.call('questions.create', values.title, values.details, (err:Meteor.Error) => {
            if(!err) {
                enqueueSnackbar("Question submitted!", { variant: "success" });
            } else {
                enqueueSnackbar(err.error, { variant: "error" });
            }
            form.setSubmitting(false);
        });
    };

    render() {
        return(
            <StyledPaper>
                <Formik
                    validationSchema={QuestionSchema}
                    initialValues={{
                        title: "",
                        details: ""
                    }}
                    onSubmit={this.handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Typography variant={"h5"}>Ask a question</Typography>
                            <Field
                                name="title"
                                label="Title"
                                fullWidth
                                component={TextField}
                            />
                            <Field
                                name="details"
                                label="Details"
                                fullWidth
                                multiline
                                component={TextField}
                            />
                            <StyledButton type="submit" loading={isSubmitting}>Submit</StyledButton>
                        </Form>
                    )}
                </Formik>
            </StyledPaper>
        )
    }
}