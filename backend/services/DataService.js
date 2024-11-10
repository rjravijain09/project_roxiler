const axios = require('axios');
const Transaction = require('../models/Transaction');

const seedDataBase = async()=>{

    const {data} = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');

    await Transaction.insertMany(data) ;
console.log('Database seeded Successfully');


};

module.exports = {seedDataBase};