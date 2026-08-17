import * as filterRepository from "../repository/filter.repository";

export const getCategories = async () => {
  return await filterRepository.getAllCategories();
};

export const getSampleTypes = async () => {
  return await filterRepository.getAllSampleTypes();
};

export const getGenres = async () => {
  return await filterRepository.getAllGenres();
};