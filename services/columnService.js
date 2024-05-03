import Column from "../models/column.js";

export const getAllColumns = (filter = {}) =>
  Column.find(filter, "-createdAt -updatedAt").populate("owner", "_id");

export const countColumns = (filter) => Column.countDocuments(filter);

export const getColumnById = (filter) => Column.findOne(filter);

export const updateColumnbyFilter = (filter, data) =>
  Column.findOneAndUpdate(filter, data);

export const removedColumn = (filter) => Column.findOneAndDelete(filter);

export const createColumn = (data) => Column.create(data);
