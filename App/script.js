// Read JSON file into Array
const fs = require('fs');
const { stdout, stdin } = require('process');

const dataFileContent = fs.readFileSync('results.json', 'utf8');    
const resultsArray = JSON.parse(dataFileContent);

// Function Imports
const menuFunctions = require('./menus');
const miscFunctions = require('./misc');

// Interface
if (resultsArray.length === 0) {
    console.log("Array is empty");
    return null;
} else {
    console.log('================================================================================');
    console.log('---------------Welcome to International Football Results Dataset----------------');
    console.log('================================================================================\n');
    console.log('================================================================================');
    console.log(miscFunctions.total(resultsArray) + " Goals scored in all matches");
    const calculateTotalAvg = miscFunctions.avg(resultsArray);
    const averageGoals = calculateTotalAvg(miscFunctions.total);
    console.log(averageGoals + " Goals per match");
    menuFunctions.menu(resultsArray);    
}

