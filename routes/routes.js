const { Router } = require('express');
const {
  testsController,
} = require('controllers');

const apiRoutes = new Router();
const testsRoutes = new Router();

apiRoutes.use('/api', testsRoutes);

testsRoutes.route('/test1').get(testsController.test1);
testsRoutes.route('/test2').get(testsController.test2);
testsRoutes.route('/test3').get(testsController.test3);
testsRoutes.route('/test4').get(testsController.test4);

module.exports = apiRoutes;
