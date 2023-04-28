'use strict';

const type = require('../models/type');
const {Type, Hardness} = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const types = await Type.findAll({attributes: ['id']});
    const hardnesses = await Hardness.findAll({attributes: ['id']});
    
    
    await queryInterface.bulkInsert('Woods', [
      {
        name: "Épicéa",
        typeId: types[1].id,
        hardnessId: hardnesses[0].id
      },
      {
        name: "Pin",
        typeId: types[0].id,
        hardnessId: hardnesses[0].id
      },
      {
        name: "Padouk",
        typeId: types[0].id,
        hardnessId: hardnesses[1].id
      },
      {
        name: "Érable",
        typeId: types[0].id,
        hardnessId: hardnesses[2].id
      },
      {
        name: "Hêtre",
        typeId: types[2].id,
        hardnessId: hardnesses[1].id
      },
      {
        name: "Itauba",
        typeId: types[1].id,
        hardnessId: hardnesses[0].id
      },
      {
        name: "Douglas",
        typeId: types[1].id,
        hardnessId: hardnesses[2].id
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Woods', null, {});
  }
};
