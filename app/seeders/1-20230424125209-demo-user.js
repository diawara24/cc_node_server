'use strict';
const bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  
  async up(queryInterface, Sequelize) {
    const hashedPass = await bcrypt.hash("123456", 10);
    await queryInterface.bulkInsert('Users', [{
      firstname: 'John',
      lastname: 'Doe',
      email: CryptoJS.AES.encrypt("john.doe@mail.com", 'secret key 123').toString(),
      password: hashedPass 
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

