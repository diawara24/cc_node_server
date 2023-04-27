const express = require('express');
const router = express();
const userCtrl = require('../controllers/user.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         firstName:
 *           type: string
 *           description: FirstName of user
 *         lastName:
 *           type: string
 *           description: LastName of user
 *         email:
 *           type: string
 *           description: email of user
 *         password:
 *           type: string
 *           description: password of user
 *       example:
 *         firstName: john
 *         lastName: Doe
 *         email: john.doe@mail.com
 *         password: P123456
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Erorr:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           description: 
 */


/**
  * @swagger
  * tags:
  *   name: Auth
  *   description: The Auth managing API
  */

/**
  * @swagger
  * /api/auth/signup:
  *   post:
  *     summary: Returns user 
  *     tags: [Auth]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/User'
  *     responses:
  *       201:
  *         description: user signup
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/User'
  *       500:
  *        description: server error
  *        content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Error'
  */
router.post('/signup', userCtrl.signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Returns user and token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $type: object
 *           example:
 *             email: john.doe@mail.com
 *             password: P123456
 *     responses:
 *       200:
 *         description: user login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *        description: bad credentials
 *       404:
 *        description: user not found
 */
router.post('/login', userCtrl.login);

module.exports = router;