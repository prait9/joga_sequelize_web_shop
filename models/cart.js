module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('cart', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  });

  Cart.associate = models => {
    Cart.belongsTo(models.user);
    Cart.belongsToMany(models.product, { through: models.cartItem });
  };

  return Cart;
};
