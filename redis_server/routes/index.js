const userRoutes = require('./users');
const petRoutes = require('./pets');

const constructorMethod = (app) => {
  app.use('/', userRoutes);
  app.use('/', petRoutes);
};

module.exports = constructorMethod;
