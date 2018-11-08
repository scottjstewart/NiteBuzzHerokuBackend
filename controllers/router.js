
const routes = [
  require('./buzzcontroller'),
  require('./usercontroller'),
  require('./commentcontroller'),
  require('../controllers/ctrlAdmin'),
  require('../controllers/ctrlUpvote')
];



module.exports = function router(app, sequelize) {
  return routes.forEach((router) => {
    router(app, sequelize);
  });
};
