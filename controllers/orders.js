const { product: Product } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();

    if (!products.length) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const order = await req.user.createOrder();

    await order.addProducts(products.map(product => {
      product.orderItem = { quantity: product.cartItem.quantity };
      return product;
    }));

    await cart.setProducts([]);

    return res.status(201).json({ message: 'Order created', orderId: order.id });
  } catch (err) {
    return res.status(500).json({ message: 'Could not create order', error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await req.user.getOrders({
      include: [{ model: Product }],
    });

    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: 'Could not load orders', error: err.message });
  }
};
