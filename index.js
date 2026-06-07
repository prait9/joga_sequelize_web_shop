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

app.use('/products', productRoutes);
app.use('/admin/products', adminProductRoutes);
app.use('/admin/product', adminProductRoutes);

sequelize
  .sync()
  .then(() => {
    console.log('Tables are synchronized');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.error(err);
  });
