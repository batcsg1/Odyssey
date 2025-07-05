/**
 * @file A repository file that provides all model controllers with all the generic CRUD database logic functions
 * @author Samuel Batchelor
 */

import prisma from "../prisma/client.js";

class Repository {

  /**
   * Creates an instance of the repository for a specific Prisma model
   * @param {string} model 
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * Creates a new database record
   * @param {Object} data - The data to create the record with
   * @returns {Promise<Object>} - The newly created record
   */
  async create(data) {
    return await prisma[this.model].create({ data });
  }

  /**
   * Finds all database records with optional filters, sorting and pagination
   * @param {Object} select - Return specific model fields
   * @param {Object} filters - Filter by specific fields
   * @param {string} sortBy - Field to sort results by
   * @param {string} sortOrder - Sort order direction
   * @param {number} page - Page number for pagination
   * @param {number} amount - Number of results per page
   * @returns {Promise<Object>} - An array of matching records
   */
  async findAll(
    select = {}, 
    filters = {}, 
    sortBy = "id", 
    sortOrder = "asc", 
    page = 1, 
    amount = 25 
  ) {
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
          if (value === 'true' || value === 'false') {
            query.where[key] = { equals: value === 'true' }; // convert to actual boolean
          } else if (Array.isArray(value)) { // Handle array case
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

  /**
   * Find a particular database record by ID
   * @param {string} id - Unique string UUID for a record
   * @param {Object} select - Return specific model fields
   * @returns {Promise<Object>} - Record based on ID
   */
  async findById(id, select) {
    return await prisma[this.model].findUnique({
      where: { id },
      ...(select && Object.keys(select).length > 0 ? { select } : {})
    });
  }

  /**
   * Update a particular database record by ID
   * @param {string} id - Unique string UUID for a record
   * @param {object} data - The data to update the record with
   * @param {object} select - Return specific model fields
   * @returns {Promise<Object>} - Updated database record
   */
  async update(id, data, select) {
    return await prisma[this.model].update({
      where: { id },
      data,
      ...(select && Object.keys(select).length > 0 ? { select } : {})
    });
  }

  /**
   * Delete a particular database record by ID
   * @param {string} id - Unique string UUID for a record
   * @returns {Promise<Object>} - Deleted database record
   */
  async delete(id) {
    return await prisma[this.model].delete({
      where: { id },
    });
  }
}

export default Repository;