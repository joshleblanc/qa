import { Mongo } from 'meteor/mongo';
import yup from 'yup';

export interface Question {
    _id?: string;
    title: string;
    details: string;
    tagIds: string[];
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export const schema = yup.object().shape({
  title: yup.string().required(),
  details: yup.string().required(),
  tagIds: yup.array().of(yup.string()).min(2, "You need to select at least two tags.")
});

export const Questions = new Mongo.Collection<Question>('questions');


