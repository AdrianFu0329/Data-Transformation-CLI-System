const readline = require('readline');
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function clearConsole() {
    console.log('\n'.repeat(2));
}

// Function to sort based on date (recent to past)
function sortDate(arr) {
    return arr.sort((a, b) => new Date(b.date) - new Date(a.date));
}

const columnsToDisplay = ['date', 'home_team', 'away_team', 'home_score', 'away_score', 'tournament', 'city', 'country'];

function displayResults(arr, currentPage, menu) {
    const pageSize = 50;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const sortedArr = sortDate(arr);
    const paginatedResults = sortedArr.slice(startIndex, endIndex);
    console.table(paginatedResults.length == 0 ? "No Results to display" : paginatedResults, columnsToDisplay);

    console.log(`Page ${currentPage}/${Math.ceil(arr.length / pageSize)}`);
    console.log('1. Next Page');
    console.log('2. Previous Page');
    console.log('3. Exit');

    r1.question('Choose an option (1-3): ', (choice) => {
        switch (choice) {
            case '1':
                currentPage++;
                displayResults(arr, currentPage, menu);
                break;
            case '2':
                if (currentPage > 1) {
                    currentPage--;
                    displayResults(arr, currentPage, menu);
                } else {
                    console.log('Already on the first page.');
                    displayResults(arr, currentPage, menu);
                }
                break;
            case '3':
                console.log('Exiting...');
                menu();
                break;
            default:
                console.log('Invalid choice. Please enter a valid option.');
                displayResults(arr, currentPage, menu);
        }
    });
}

module.exports = {
    clearConsole: clearConsole,
    displayResults: displayResults
}