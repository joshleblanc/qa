import { Mongo } from 'meteor/mongo';
import yup from 'yup';
import { Tag } from './tag';
import { Meteor } from 'meteor/meteor';

export interface Question {
  _id?: string;
  title: string;
  details: string;
  tags: Set<Tag>;
  user: Meteor.User;
  createdAt: Date;
  updatedAt: Date;
}

export const schema = yup.object().shape({
  title: yup.string().notRequired(),
  details: yup.string().notRequired()
});

export const Questions = new Mongo.Collection<Question>('questions');


