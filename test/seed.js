const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Vendor = require('./models/Vendor');
const Client = require('./models/Client');
const TenderMatch = require('./models/TenderMatch');

// Load environment variables
dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Seed data
const vendors = [
  {
    name: 'Vendor 1',
    email: 'vendor1@example.com',
    contact: '1234567890',
    products: ['Product A', 'Product B'],
    ratings: 4.5,
  },
  {
    name: 'Vendor 2',
    email: 'vendor2@example.com',
    contact: '9876543210',
    products: ['Product C', 'Product D'],
    ratings: 4.0,
  },
  {
    name: 'Vendor 3',
    email: 'vendor3@example.com',
    contact: '1122334455',
    products: ['Product E', 'Product F'],
    ratings: 5.0,
  }
];

const clients = [
  {
    name: 'Client 1',
    email: 'client1@example.com',
    contact: '5555555555',
    requestedProducts: ['Product A', 'Product C'],
    maxBudget: 1000,
  },
  {
    name: 'Client 2',
    email: 'client2@example.com',
    contact: '6666666666',
    requestedProducts: ['Product B', 'Product F'],
    maxBudget: 1500,
  },
  {
    name: 'Client 3',
    email: 'client3@example.com',
    contact: '7777777777',
    requestedProducts: ['Product E', 'Product D'],
    maxBudget: 1200,
  }
];

const tenderMatches = [
  {
    clientId: 'client1@example.com',
    vendorId: 'vendor1@example.com',
    matchedProducts: ['Product A'],
    price: 800,
  },
  {
    clientId: 'client2@example.com',
    vendorId: 'vendor3@example.com',
    matchedProducts: ['Product B'],
    price: 1200,
  },
  {
    clientId: 'client3@example.com',
    vendorId: 'vendor2@example.com',
    matchedProducts: ['Product D'],
    price: 1000,
  }
];

// Function to seed data
const seedData = async () => {
  try {
    // Delete existing data
    await Vendor.deleteMany();
    await Client.deleteMany();
    await TenderMatch.deleteMany();

    // Insert vendors
    await Vendor.insertMany(vendors);
    console.log('Vendors seeded');

    // Insert clients
    await Client.insertMany(clients);
    console.log('Clients seeded');

    // Insert tender matches
    await TenderMatch.insertMany(tenderMatches);
    console.log('Tender matches seeded');

    // Close the connection
    mongoose.connection.close();
    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};

// Run the seeding function
seedData();
