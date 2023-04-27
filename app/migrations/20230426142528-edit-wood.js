'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Woods', null, {});
    await queryInterface.addColumn('Woods', 'typeId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'Types',
        key: 'id'
      },
      allowNull: false
    });

    await queryInterface.addColumn('Woods', 'hardnessId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'Hardnesses',
        key: 'id'
      },
      allowNull: false
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Woods", "Woods_hardnessId_foreign_idx");
    await queryInterface.removeConstraint("Woods", "Woods_typeId_foreign_idx");
    await queryInterface.removeColumn("Woods", "typeId");
    await queryInterface.removeColumn("Woods", "hardnessId");

  }
};
