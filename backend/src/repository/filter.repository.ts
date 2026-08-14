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

export const getFilterNamesByIds = async (
  categoryIds: number[],
  sampleTypeIds: number[],
  genreIds: number[]
) => {
  const [categories, sampleTypes, genres] = await Promise.all([
    Category.findAll({
      where: { id: categoryIds },
      attributes: ["name"],
    }),

    SampleType.findAll({
      where: { id: sampleTypeIds },
      attributes: ["name"],
    }),

    Genre.findAll({
      where: { id: genreIds },
      attributes: ["name"],
    }),
  ]);

  return {
    categories: categories.map((category) => category.name),
    sampleTypes: sampleTypes.map(
      (sampleType) => sampleType.name
    ),
    genres: genres.map((genre) => genre.name),
  };
};