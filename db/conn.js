const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const DB = process.env.DATABASE;
if (!DB) {
  console.warn(
    'DATABASE is not set. Skipping MongoDB connection (set DATABASE in server/config.env).'
  );
} else {
  mongoose
    .connect(DB)
    .then(() => {
      console.log('MongoDB connection successful');
    })
    .catch((err) => {
      console.error('MongoDB connection failed:', err.message);
      process.exit(1);
    });
}