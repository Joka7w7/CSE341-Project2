const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Library API',
    description: 'API for managing books and authors',
    version: '1.0.0'
  },
  host: process.env.NODE_ENV === 'production'
    ? 'cse341-project2-473b.onrender.com'
    : 'localhost:3000',
  schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http'],
  basePath: '/'
};

const outputFile = './swagger.json';
const endpointsFiles = [
  './routes/index.js',
  './routes/books.js',
  './routes/authors.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc);