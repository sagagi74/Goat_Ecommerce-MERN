const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TeamGoat_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, // This is for replacing deprecated ensureIndex
    useFindAndModify: false // This is for replacing deprecated findAndModify
  });
  
  module.exports = mongoose.connection
