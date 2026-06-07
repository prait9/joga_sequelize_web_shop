const { product: Product } = require('../models');

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

exports.getCart = async (req, res) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();

    return res.json({ cart, products });
  } catch (err) {
    return res.status(500).json({ message: 'Could not load cart' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cart = await req.user.getCart();
    const products = await cart.getProducts({ where: { id: product.id } });
    const cartProduct = products[0];
    let quantity = 1;

    if (cartProduct) {
      quantity = cartProduct.cartItem.quantity + 1;
      await cartProduct.cartItem.update({ quantity });
    } else {
      await cart.addProduct(product, { through: { quantity } });
    }

    return res.json({ message: 'Product added to cart', productId: product.id, quantity });
  } catch (err) {
    return res.status(500).json({ message: 'Could not add product to cart', error: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cart = await req.user.getCart();
    const products = await cart.getProducts({ where: { id: product.id } });
    const cartProduct = products[0];

    if (!cartProduct) {
      return res.status(404).json({ message: 'Product is not in cart' });
    }

    const quantity = cartProduct.cartItem.quantity - 1;

    if (quantity > 0) {
      await cartProduct.cartItem.update({ quantity });
      return res.json({ message: 'Product quantity decreased', productId: product.id, quantity });
    }

    await cart.removeProduct(product);

    return res.json({ message: 'Product removed from cart', productId: product.id });
  } catch (err) {
    return res.status(500).json({ message: 'Could not remove product from cart', error: err.message });
  }
};
