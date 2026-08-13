import Category from "../models/category.model";
import SampleType from "../models/sample-type.model";
import Genre from "../models/genre.model";

export const getAllCategories = async () => {
  return await Category.findAll({
    order: [["name", "ASC"]],
  });
};

export const getAllSampleTypes = async () => {
  return await SampleType.findAll({
    order: [["name", "ASC"]],
  });
};

export const getAllGenres = async () => {
  return await Genre.findAll({
    order: [["name", "ASC"]],
  });
};