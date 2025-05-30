import prisma from "../prisma/client.js";

class Repository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await prisma[this.model].create({ data });
  }

  async findAll(select = {}, filters = {}, sortBy = "id", sortOrder = "asc", page = 1, amount = 5) {

    const query = {
      take: Number(amount),
      skip: (Number(page) - 1) * Number(amount),
      orderBy: {
        [sortBy]: sortOrder, // Sort by the specified column and order
      },
      select
    };

    if (Object.keys(filters).length > 0) {
      query.where = {};
      // Loop through the filters and apply them dynamically
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) { // Handle array case
            query.where[key] = { in: value };  // Use 'in' for array values
          } else if (!isNaN(value)) { // Handle numeric fields (non-array)
            query.where[key] = { equals: Number(value) };  // Use 'equals' for numeric fields
          } else if (Date.parse(value)) { // Date fields
            query.where[key] = { equals: new Date(value) };
          } else {
            query.where[key] = { equals: value };
          }
        }
      }
    }

    return await prisma[this.model].findMany(query);
  }

  async findById(id, select) {
    return await prisma[this.model].findUnique({
      where: { id },
      ...(select && Object.keys(select).length > 0 ? { select } : {})
    });
  }

  async update(id, data, select) {
    return await prisma[this.model].update({
      where: { id },
      data,
      ...(select && Object.keys(select).length > 0 ? { select } : {})
    });
  }

  async delete(id) {
    return await prisma[this.model].delete({
      where: { id },
    });
  }
}

export default Repository;