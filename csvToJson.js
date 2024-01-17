const fs = require('fs');
const csv = require('csv-parser');

const csvPath = 'results.csv';
const jsonPath = 'results.json';

const data = [];

fs.createReadStream(csvPath)
  .pipe(csv())
  .on('data', (row) => {
    data.push(row);
  })
  .on('end', () => {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4));
    console.log(`Conversion complete. JSON file saved at ${jsonPath}`);
  });
