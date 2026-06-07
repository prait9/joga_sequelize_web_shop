const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.getProducts);
router.get('/cart', productsController.getCart);
router.post('/cart/add/:id', productsController.addToCart);
router.post('/cart/delete/:id', productsController.removeFromCart);
router.get('/:id', productsController.getProduct);

module.exports = router;
