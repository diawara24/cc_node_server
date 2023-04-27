'use strict';

const type = require('../models/type');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const types = await queryInterface.findOne();
    const hardness = await queryInterface.findAll();
    
    await queryInterface.bulkInsert('Woods', [
      {
        name: "Épicéa",
        typeId: 1,
        hardnessId: 2
      },
      {
        name: "Pin",
        typeId: 1,
        hardnessId: 2
      },
      {
        name: "Padouk",
        typeId: 2,
        hardnessId: 2
      },
      {
        name: "Érable",
        typeId: 3,
        hardnessId: 1
      },
      {
        name: "Hêtre",
        typeId: 3,
        hardnessId: 2
      },
      {
        name: "Itauba",
        typeId: 2,
        hardnessId: 2
      },
      {
        name: "Douglas",
        typeId: 1,
        hardnessId: 1
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Woods', null, {});
  }
};
