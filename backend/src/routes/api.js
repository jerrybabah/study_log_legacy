var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({msg: 'this is api route'});
});

router.use('*', function(req, res, next) {
  res.json({msg: 'any api is not found'});
})

module.exports = router;
