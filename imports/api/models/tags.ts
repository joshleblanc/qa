import yup from 'yup';
import {Mongo} from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import {isAdmin} from '../methods/extended_user';
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

export const searchTagsByName = (query:string, sortBy:SortBy, limit = 0, skip = 0) => {
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

Meteor.methods({
  "tags.update"(newTag:Tag) {
    if(!isAdmin(Meteor.user())) {
      throw new Meteor.Error("Not Authorized");
    }
    Tags.update({
      _id: newTag._id
    }, {
      $set: {
        description: newTag.description,
        name: newTag.name,
        related: newTag.related,
        usages: newTag.usages
      }
    })
  }
});