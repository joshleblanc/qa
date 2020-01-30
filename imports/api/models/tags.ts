import yup from 'yup';
import {Mongo} from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { isAdmin } from '../methods/extended_user';
import {SortBy} from "/imports/ui/components/tags/SortBySelector";

export interface Tag {
  _id?: string;
  name: string;
  description: string;
  usages: number;
  related: string[],
  createdAt: Date,
  updatedAt: Date
}

export const TagSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().min(6, "Description must be at least 6 characters").required(),
  related: yup.array().of(yup.string())
});

export const searchTagsByName = (query:string, sortBy:SortBy, limit = undefined, skip = 0) => {
  let sort;

  if(sortBy === SortBy.Name) {
    sort = {
      name: 1
    }
  } else if(sortBy === SortBy["Date Added"]) {
    sort = {
      createdAt: 1
    }
  } else {
    sort = {
      usages: 1
    }
  }

  return Tags.find({
    name: new RegExp(`^${query}`, "i")
  }, {
    skip,
    limit,
    sort
  });
};

export const Tags = new Mongo.Collection<Tag>('tags');

Tags.allow({
  insert: (userId: string): boolean => {
    // Selects the first user resulting from the search
    // And in a normal world there should be one result being returned as well.
    const user = Meteor.users.find({ _id: userId }).fetch()[0];
    return isAdmin(user);
  },
  update: (userId: string): boolean => {
    const user = Meteor.users.find({ _id: userId }).fetch()[0];
    return isAdmin(user);
  },
  remove: (userId: string): boolean => {
    const user = Meteor.users.find({ _id: userId }).fetch()[0];
    return isAdmin(user);
  }
});