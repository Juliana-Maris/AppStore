
'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const authService = require('../services/auth-service');

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.get('/tags/:tag', controller.getByTag);

router.post('/', authService.authorize, controller.post); // com isAdmin não funciona
router.put('/:id', authService.authorize, controller.put);
router.delete('/', authService.authorize, controller.delete); // tirou o id '/:id'

module.exports = router;