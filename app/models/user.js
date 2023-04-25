'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "le prenom ne doit pas etre null"}
      }
    },
    lastName:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "le nom ne doit pas etre null"}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
      validate: {
        notNull: {msg: "Votre email ne doit pas etre null"}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg:"Votre mot de passe ne doit pas etre null"}
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};