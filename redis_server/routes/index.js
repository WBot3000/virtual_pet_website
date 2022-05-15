const userRoutes = require('./users');
const petRoutes = require('./pets');
const shopRoutes=require('./shops');
const itemRoutes=require('./items');


const constructorMethod = (app) => {
  app.use('/', userRoutes);
  app.use('/', petRoutes);
  app.use('/',shopRoutes);
  app.use('/',itemRoutes);
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
