const express = require('express');
const router = express();
const woodCtrl = require('../controllers/wood.js');
const auth = require("../middleware/auth.js");
const multer = require('../middleware/multer.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     Wood:
 *       type: object
 *       required:
 *         - name
 *         - typeId
 *         - hardnessId
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the wood
 *         name:
 *           type: string
 *           description: name of wood
 *         typeId:
 *           type: integer
 *           description: id of wood type
 *         hardnessId:
 *           type: integer
 *           description: id of wood hardness
 *       example:
 *         name: Pin
 *         typeId: 11
 *         hardnessId: 12
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           description: 
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * security:
 *   - bearerAuth: []
 */


/**
  * @swagger
  * tags:
  *   name: Woods
  *   description: The Wood managing API
  */

/**
  * @swagger
  * /api/wood/all:
  *   get:
  *     summary: Returns woods 
  *     tags: [Woods]
  *     security:
  *       - bearerAuth: []
  *     responses:
  *       200:
  *         description: all wood
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *       500:
  *        description: error server
  *        content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Error'
  */
router.get('/all', auth, woodCtrl.readAll);

/**
 * @swagger
 * /api/wood/{id}:
 *   get:
 *     summary: Get the wood by id
 *     tags: [Woods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The wood id
 *     responses:
 *       200:
 *         description: The wood description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wood'
 *       404:
 *         description: The wood was not found
 *       500:
  *        description: error server
  *        content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', auth, woodCtrl.findById);

/**
 * @swagger
 * /api/wood:
 *   get:
 *     summary: Get the wood by type
 *     tags: [Woods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: hardness
 *         schema:
 *           type: string
 *         required: true
 *         description: The wood type
 *     responses:
 *       200:
 *         description: The wood description by type
 *         contens:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
  *        description: error server
  *        content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Error'
 */
router.get('/', auth, woodCtrl.findByHardness);

/**
 * @swagger
 * /api/wood:
 *   post:
 *     summary: add wood
 *     tags: [Woods]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: string
 *             properties:
 *                  datas:   
 *                   type: string
 *             example:
 *               datas:             
 *     responses:
 *       201:
 *         description: The wood description 
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wood'
 *       500:
  *        description: error server
  *        content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Error'
 */
router.post("/", auth, multer, woodCtrl.create);

/**
 * @swagger
 * /api/wood/{id}:
 *  put:
 *    summary: Update the wood by the id
 *    tags: [Woods]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The wood id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UWood'
 *    responses:
 *      200:
 *        description: The wood was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Wood'
 *      404:
 *        description: The wood was not found
 *      500:
 *        description: Error server
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
router.put("/:id", auth, multer, woodCtrl.update);

/**
 * @swagger
 * /api/wood/{id}:
 *   delete:
 *     summary: Remove the wood by id
 *     tags: [Woods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The wood id
 *     responses:
 *       200:
 *         description: The wood was deleted
 *       404:
 *         description: The wood was not found
 *       500:
 *        description: Error server
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
router.delete("/:id", auth, woodCtrl.delete);


module.exports = router;