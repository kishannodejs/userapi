const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 4000;


// const specs = swaggerJsdoc(configSwaggerJsdoc);

// app.use(
//   "/api-docs", swaggerUi.serve, swaggerUi.setup(specs)
// );


// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Customer API",
        description: "Customer API Information",
        contact: {
          name: "Amazing Developer"
        },
        servers: ["http://localhost:4000"]
      }
    },
    // ['.routes/*.js']
    apis: ["index.js"]
  };
  
  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));



// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});

// define a root/default route

// Routes
/**
 * @swagger
 * /:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */


app.get('/', (req, res) => {
    res.json({"message": "Hello World"});
});


// Routes
/**
 * @swagger
 * /api/users:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The catchphrase ID.
 *     description: Get a catchphrase by id
 *     responses:
 *       200:
 *         description: Returns the requested catachphrase
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The catchphrase ID.
 *      - in: body
 *        name: catchphrase
 *        description: Update catchphrase
 *        schema:
 *          type: object
 *          properties:
 *            first_name:
 *              type: string
 *            last_name:
 *              type: string
 *            email:
 *              type: string
 *            phone:
 *              type: string
 *            is_active:
 *              type: boolean
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     parameters:
 *      - in: body
 *        name: catchphrase
 *        description: New catchphrase
 *        schema:
 *          type: object
 *          properties:
 *            first_name:
 *              type: string
 *            last_name:
 *              type: string
 *            email:
 *              type: string
 *            phone:
 *              type: string
 *            is_active:
 *              type: boolean
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The catchphrase ID.
 *     description: Delete a catchphrase by id
 *     responses:
 *       200:
 *         description: Returns the requested catachphrase
 */

// Require Users routes
const userRoutes = require('./src/routes/user.routes')
// using as middleware
app.use('/api/users', userRoutes)

// listen for requests
app.listen(port, () => {
    console.log(`Node server is listening on port ${port}`);
});