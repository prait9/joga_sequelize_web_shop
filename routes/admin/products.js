const express = require('express');
const productsController = require('../../controllers/admin/products');

const router = express.Router();

router.get('/', productsController.getProducts);
router.post('/', productsController.createProduct);
router.get('/:id', productsController.getProduct);
router.get('/edit/:id', productsController.getProduct);
router.put('/:id', productsController.updateProduct);
router.put('/edit/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
