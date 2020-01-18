import { Mongo } from 'meteor/mongo';
import yup from 'yup';

export interface Question {
    _id?: string;
    title: string;
    details: string;
    createdAt: Date;
    updatedAt: Date;
}

export const schema = yup.object().shape({
    title: yup.string().notRequired(),
    details: yup.string().notRequired()
});

export const Questions = new Mongo.Collection<Question>('questions');


