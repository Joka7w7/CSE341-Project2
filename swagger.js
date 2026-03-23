const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Library API',
        description: 'API for managing books and authors',
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = [
  './routes/index.js',
  './routes/books.js',
  './routes/authors.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc);