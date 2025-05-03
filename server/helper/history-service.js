const History = require("../models/history");

async function findByGenerationId(generation_id) {
  try {
    const history = await History.findOne({ generation_id });

    return history;
  } catch (error) {
    throw error;
  }
}
async function createNewHistory(data) {
  try {
    const history = await History.create(data);

    return history;
  } catch (error) {
    throw error;
  }
}

module.exports = { createNewHistory, findByGenerationId };
