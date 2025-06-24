/**
 * @file A repository file that provides all model controllers with more advanced database logic functions
 * @author Samuel Batchelor
 */

import Repository from "./generic.js";
import prisma from "../prisma/client.js";

class advancedRepository extends Repository {

    /**
     * Creates an instance of the repository based on the repository class's constructor
     * @param {string} model 
     */
    
    constructor(model) {
        super(model); // Call the parent class's constructor
    }

    /**
     * @description This function finds one model by foreign key
     * @param {string} model - Database model
     * @param {string} field - Foreign key field
     * @param {string} value - Foreign key value
     * @returns {object} The first matching record with the specified foreign key
     */

    async findOneByForeignKey(model, field, value) {
        return await prisma[model].findUnique({
            where: { 
                [field]: value,
             }
        });
    }

    /**
     * @description This function finds many models by foreign key
     * @param {string} model - Database model
     * @param {string} field - Foreign key field
     * @param {string} value - Foreign key value
     * @returns {<Array>object} An array of matching records with the specified foreign key
     */

    async findManyByForeignKey(model, field, value) {
        return await prisma[model].findMany({
            where: {
                [field]: value,
            },
        });
    }

}
export default advancedRepository