const db = require('../config/connection');
const { Customer } = require('../models');
const { Product } = require('../models');
const { TransactionMain } = require('../models');
const { TransactionDetail } = require('../models');
const customerSeeds = require('./customerData.json');
const productSeeds = require('./productData.json');
const transactionDetailSeeds = require('./transactionDetailData.json');
const transactionMainSeeds = require('./transactionMainData.json');

db.once('open', async () => {
  try {
    await Customer.deleteMany({});
    await Product.deleteMany({});
    await TransactionMain.deleteMany({});
    await TransactionDetail.deleteMany({});

    const customer = await Customer.create(customerSeeds);

    const productData = await Product.create(productSeeds);

    for (let i = 0; i < 2; i++) {
      (transactionMainSeeds[i].customer_id = customer[0]._id);
    }
    const transactionMainData = await TransactionMain.create(transactionMainSeeds);
    
    for (let i = 0; i < 2; i++) {
      (transactionDetailSeeds[i].transaction_id = transactionMainData[0]._id);
    }
    for (let i =2; i < 5; i++){
      (transactionDetailSeeds[i].transaction_id = transactionMainData[1]._id);
    }

    (transactionDetailSeeds[0].product_id = productData[1]._id);
    (transactionDetailSeeds[4].product_id = productData[1]._id);
    (transactionDetailSeeds[1].product_id = productData[0]._id);
    (transactionDetailSeeds[2].product_id = productData[3]._id);
    (transactionDetailSeeds[3].product_id = productData[3]._id);

    const transactionDetailData = await TransactionDetail.create(transactionDetailSeeds);
    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Database seeded!');
  process.exit(0);
});


