import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';

// Load our environment variables and connect to the database
dotenv.config();
connectDB();

const importData = async () => {
  try {
    // 1. Clear out all existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // 2. Insert the dummy users into the database
    const createdUsers = await User.insertMany(users);

    // 3. Grab the Admin user's ID (the first user in our users.js array)
    const adminUser = createdUsers[0]._id;

    // 4. Map over our products and attach the Admin user ID to each one
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // 5. Insert the products into the database
    await Product.insertMany(sampleProducts);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with import: ${error.message}`);
    process.exit(1); // Exit with a failure code
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error with destroy: ${error.message}`);
    process.exit(1);
  }
};

// This allows us to run 'node backend/seeder.js -d' to destroy data, 
// or just 'node backend/seeder.js' to import data
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}