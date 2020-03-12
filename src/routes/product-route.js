'use strict'

const express = require('express');
const productController = require('../controllers/product-controller');
const authService = require('../services/auth-service');

const router = express.Router();

router.get('/', productController.get);
router.get('/:id', productController.getbyId);
router.post('/', authService.isAdmin, productController.post);
router.put('/:id', authService.isAdmin, productController.put);
router.delete('/:id', authService.isAdmin, productController.delete);

module.exports = router;
