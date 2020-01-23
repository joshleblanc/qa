import yup from 'yup';
import {Mongo} from 'meteor/mongo';

export interface Tag {
  _id?: string;
  name: string;
  description: string;
  usages: number;
  related: string[]
}

export const TagSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().min(6, "Description must be at least 6 characters").required(),
  related: yup.array().of(yup.string())
});

export const searchTagsByName = (query:string, limit = undefined, skip = 0) => {
  return Tags.find({
    name: new RegExp(`^${query}`, "i")
  }, {
    skip,
    limit,
    sort: {
      usages: 1
    }
  });
};

export const Tags = new Mongo.Collection<Tag>('tags');