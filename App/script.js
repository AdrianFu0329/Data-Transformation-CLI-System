// Read JSON file into Array
const fs = require('fs');
const { stdout, stdin } = require('process');

const dataFileContent = fs.readFileSync('results.json', 'utf8');    
const resultsArray = JSON.parse(dataFileContent);

// Function Imports
const menuFunctions = require('./menus');

// Interface
if (resultsArray.length === 0) {
    console.log("Array is empty");
    return null;
} else {
    menuFunctions.menu(resultsArray);    
}

