const express = require('express');
const sequelize = require('./utils/db');
const models = require('./models');
const productRoutes = require('./routes/products');
const adminProductRoutes = require('./routes/admin/products');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Web shop app' });
});

app.use(async (req, res, next) => {
  try {
    const user = await models.user.findByPk(1);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
});

app.use('/products', productRoutes);
app.use('/admin/products', adminProductRoutes);
app.use('/admin/product', adminProductRoutes);

sequelize
  .sync({ force: true })
  .then(() => models.user.create({ name: 'Dummy User', email: 'dummy@example.com' }))
  .then(() => {
    console.log('Tables are synchronized');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.error(err);
  });
