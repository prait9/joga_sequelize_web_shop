module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Product.associate = models => {
    Product.belongsTo(models.user);

    if (models.cart && models.cartItem) {
      Product.belongsToMany(models.cart, { through: models.cartItem });
    }

    if (models.order) {
      Product.belongsToMany(models.order, { through: 'orderItems' });
    }
  };

  return Product;
};
