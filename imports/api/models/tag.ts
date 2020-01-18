import { Mongo } from "meteor/mongo";
import yup from 'yup';

export interface Tag {
  _id: string;
  name: string;
  details?: string;
}

export const TagSchema = yup.object().shape({
  name: yup.string().required(),
  details: yup.string().notRequired()
});

export const Tags = new Mongo.Collection<Tag>('tags');