const faker = require('faker');
const db = require('./index.js');
const mongoose = require('mongoose');
const fs = require('fs');
const RecommendedItem = require('./RecommendedItem.js');

const generateRecords = function(numRecords) {
  let records = [];
  let brands = [];
  let departments = [];

  for (let i = 0; i < numRecords / 10; i++) {
    brands.push(faker.company.companyName());
    departments.push(faker.commerce.department());
  }

  for (let i = 0; i < numRecords; i++) {
    records.push({
      id: i,
      title: faker.commerce.productName(),
      brand: brands[ Math.floor( Math.random() * brands.length ) ],
      department: departments[ Math.floor( Math.random() * departments.length ) ],
      price: Number(faker.commerce.price(0, 100)) - Math.ceil(Math.random() * 5) / 100,
      imageUrl: `https://twzkraus-fec-images.s3-us-west-1.amazonaws.com/target-images/${i % 50}.jpg`,
      productUrl: `/${i % 100 + 1}`
    });
  }
  return records;
};

RecommendedItem.deleteMany({}, (err) => {
  if (err) {
    console.log('error deleting:', err);
  } else {
    console.log('database has been cleared and will be re-generated');
    const records = generateRecords(700);
    RecommendedItem.create(records)
      .then(() => {
        fs.writeFile('./data/example_data.js', `module.exports = ${JSON.stringify(records)}`, (err) => {
          if (err) {
            console.log('error:', err);
          } else {
            console.log('example data file has been written');
          }
          mongoose.disconnect();
        });
      });
  }
});

