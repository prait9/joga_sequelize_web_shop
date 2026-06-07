module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  });

  Order.associate = models => {
    Order.belongsTo(models.user);
    Order.belongsToMany(models.product, { through: models.orderItem });
  };

  return Order;
};
