const { product: Product } = require('../../models');

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      title: req.body.title,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Could not create product', error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Could not load products' });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json(product);
  } catch (err) {
    return res.status(500).json({ message: 'Could not load product' });
  }
};

exports.updateProduct = async (req, res) => {
  if (req.query.edit && req.query.edit !== 'true') {
    return res.status(403).json({ message: 'Product editing is not allowed' });
  }

  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.update({
      title: req.body.title,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
    });

    return res.json(product);
  } catch (err) {
    return res.status(400).json({ message: 'Could not update product', error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();

    return res.json({ message: 'Product deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Could not delete product' });
  }
};
