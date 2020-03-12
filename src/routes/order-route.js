'use strict'

const express = require('express');
const oderController = require('../controllers/order-controller');
const authService = require('../services/auth-service')

const router = express.Router();

router.get('/',authService.authorize, oderController.get);
router.get('/:id',authService.authorize, oderController.getbyId);
router.post('/',authService.authorize, oderController.post);
router.put('/:id',authService.authorize, oderController.put);
router.delete('/:id', authService.authorize, oderController.delete);

module.exports = router;
