import yup from 'yup';
import {Mongo} from 'meteor/mongo';
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

export const searchTagsSort = (sortBy:SortBy) => {
  if(sortBy === SortBy.Name) {
    return {
      name: 1
    }
  } else if(sortBy === SortBy["Date Added"]) {
    return {
      createdAt: 1
    }
  } else {
    return {
      usages: 1
    }
  }
};

export const searchTagsByName = (query:string, sortBy:SortBy, limit = 0, skip = 0) => {
  let sort = searchTagsSort(sortBy);

  return Tags.find({
    name: new RegExp(`^${query}`, "i")
  }, {
    skip,
    limit,
    sort
  });
};

export const Tags = new Mongo.Collection<Tag>('tags');