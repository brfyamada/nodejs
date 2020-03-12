'use strict'

const express = require('express');
const customerController = require('../controllers/customer-controller');
const authService = require('../services/auth-service');

const router = express.Router();

router.get('/', customerController.get);
router.get('/:id', customerController.getbyId);
router.post('/', authService.authorize, customerController.post);
router.put('/:id',customerController.put);
router.delete('/:id', customerController.delete);
router.post('/authenticate', customerController.authenticate);
router.post('/refresh-token', authService.authorize, customerController.refreshToken);

module.exports = router;
