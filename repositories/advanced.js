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

    async findOneByForeignKey(model, foreignKeyField, foreignKeyValue) {
        return await prisma[model].findUnique({
            where: { 
                [foreignKeyField]: foreignKeyValue,
             }
        });
    }

    async findManyByForeignKey(model, foreignKeyField, foreignKeyValue) {
        return await prisma[model].findMany({
            where: {
                [foreignKeyField]: foreignKeyValue,
            },
        });
    }

}
export default advancedRepository