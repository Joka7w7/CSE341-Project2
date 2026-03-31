const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', (req, res, next) => {
  // ✅ Dynamically set host and scheme based on incoming request
  const dynamicSwagger = {
    ...swaggerDocument,
    host: req.headers.host,
    schemes: req.protocol === 'https' ? ['https'] : ['http']
  };
  req.swaggerDoc = dynamicSwagger;
  next();
}, swaggerUi.setup());

module.exports = router;