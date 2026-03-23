const express = require('express');
const mongodb = require('./data/database');
const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;

const routes = require('./routes');
app.use('/', routes);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'Origin, X-Requested-With, Content-Type, Accept, Z-key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});


mongodb.initDb((err) => {
  if (err) {
    console.log("❌ DB connection failed:", err.message);
  } else {
    app.listen(port, () => {
      console.log(`✅ Database connected. Server running on port ${port}`);
    });
  }
});