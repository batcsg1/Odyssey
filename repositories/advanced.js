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

    // -- Meteor Shower related functions --

    /**
     * Finds a meteor shower that belongs to a particular constellation
     * @param {string} constellationId - Unique string UUID for a constellation record
     * @returns {Promise<Object>} - Record based on Constellation ID
     */

    async findByConstellationId(constellationId) {
        return await prisma.meteorShower.findUnique({
            where: { constellationId }
        });
    }
}
export default advancedRepository