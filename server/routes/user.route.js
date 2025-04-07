const express = require('express');
const {test,signout} = require('../controllers/user.controller.js');
const router = express.Router();
const { submitForm } = require('../controllers/auth.controller');
router.post('/', submitForm);
router.get('/test', test)
router.post('/signout', signout)
module.exports = router;