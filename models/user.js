module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.associate = models => {
    User.hasMany(models.product);

    if (models.cart) {
      User.hasOne(models.cart);
    }

    if (models.order) {
      User.hasMany(models.order);
    }
  };

  return User;
};
