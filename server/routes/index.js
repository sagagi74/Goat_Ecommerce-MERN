const router = require('express').Router();
const customerRoutes = require('./api/customer-routes');
const productRoutes = require('./api/product-routes');
const transactionRoutes = require('./api/transaction-routes');

router.use('/customer', customerRoutes);
router.use('/products', productRoutes);
router.use('/transaction', transactionRoutes);

module.exports = router;
