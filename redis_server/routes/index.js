const userRoutes = require('./users');
const petRoutes = require('./pets');
const itemRoutes = require('./items');

const constructorMethod = (app) => {
  app.use('/', userRoutes);
  app.use('/', petRoutes);
  app.use('/', itemRoutes);
};

module.exports = constructorMethod;
