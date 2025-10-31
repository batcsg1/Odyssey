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

    async findOne(model, conditions) {
        return await prisma[model].findUnique({
            where: {
                ...conditions
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

    async findChildren(models, conditions) {
        const results = await Promise.all(
            models.map(model =>
                prisma[model].findMany({ where: { ...conditions } })
            )
        );
        // Flatten array of arrays into a single array
        return results.flat();
    }

}
export default advancedRepository