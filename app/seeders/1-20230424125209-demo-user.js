'use strict';
const bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");

const key = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f");
const iv = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  
  async up(queryInterface, Sequelize) {
    const hashedPass = await bcrypt.hash("123456", 10);
    await queryInterface.bulkInsert('Users', [{
      firstname: 'John',
      lastname: 'Doe',
      email: CryptoJS.AES.encrypt("john.doe@mail.com",key, {iv: iv}).toString(),
      password: hashedPass 
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

