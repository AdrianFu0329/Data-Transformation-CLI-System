const readline = require('readline');
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function imports
const filterFunctions = require('./filter');
const miscFunctions = require('./misc');
const searchFunctions = require('./search');
const widgets = require('./widgets');
const { start } = require('repl');
require('console');

// Constants
const constants = require('./constants');
const mainMenu = constants.mainMenu;
const filterMenu = constants.filterMenu;
const searchMenu = constants.searchMenu;
const miscMenu = constants.miscMenu;
const top50Message = "(Only top 50 results are shown)";
const backMenuMessage = 'Going Back to Main Menu...';

function menuOptionHandler(arr, menuOptionsArr) {
    switch (menuOptionsArr) {
        case mainMenu:
            handleMainMenuChoice(arr);
            break;
        case filterMenu:
            handleFilterMenuChoice(arr);
            break;
        case searchMenu:
            handleSearchMenuChoice(arr);
            break;
        case miscMenu:
            handleMiscMenuChoice(arr);
            break;
        default:
            return null;
    }  
}

function displayMenu(arr, menuOptionsArr = mainMenu) {
    console.log('================================================================================\n');
    miscFunctions.menuHeader(menuOptionsArr);
    console.log('================================================================================');
    (menuOptionsArr || []).forEach((option, index) => {
        console.log(`${index + 1}. ${option}`);
    });
    console.log(`${(menuOptionsArr || []).length + 1}. Exit`);
    console.log('================================================================================\n');
    
    menuOptionHandler(arr, menuOptionsArr);  
}

function handleMainMenuChoice(arr) {
    r1.question('Choose an option (1-4): ', (choice) => {
        switch (choice) {
            case '1':
                displayMenu(arr, filterMenu);
                break;
            case '2':
                displayMenu(arr, searchMenu);
                break;
            case '3':
                displayMenu(arr, miscMenu);
                break;
            case '4':
                console.log('Goodbye!');
                r1.close();
                break;
            default:
                console.log('Invalid choice. Please enter a valid option.');
                displayMenu(arr, mainMenu);
                handleMainMenuChoice();
        }
    });
}

function handleFilterMenuChoice(arr) {
    r1.question('Choose an option (1-8): ', (choice) => {
        switch (choice) {
            case '1':
                console.log("Filter Matches Based on Date Range");
                r1.question("Enter Start Date (YYYY-MM-DD): ", (startDate) => {
                    r1.question("Enter End Date (YYYY-MM-DD / Blank): ", (endDate) => {
                        const dateFilter = endDate ? filterFunctions.date(startDate)(endDate)(arr) : filterFunctions.date(startDate)()(arr)
                        console.log(`\nMatches that are played between ${startDate} and ${endDate || "now"}: ${dateFilter.length}`)
                        console.log(top50Message);
                        widgets.displayResults(dateFilter.length == 0 ? `No matches played in between ${startDate} and ${endDate || "now"}` : dateFilter, 1, () => displayMenu(arr, filterMenu));
                    });
                });
                break;
            case '2':
                console.log("Filter Matches Based on Home Team");
                r1.question("Enter Team name: ", (team) => {
                    const filteredHomeResult = filterFunctions.home_team(team)(arr);
                    console.log(`\nMatches Played by ${team} at home: ${filteredHomeResult.length}: `);
                    console.log(top50Message);
                    widgets.displayResults(filteredHomeResult.length == 0 ? `No matches played in ${team}` : filteredHomeResult, 1, () => displayMenu(arr, filterMenu));
                });
                break;
            case '3':
                console.log("Filter Matches Based on Away Team");
                r1.question("Enter Team name: ", (team) => {
                    const filteredAwayResult = filterFunctions.away_team(team)(arr);
                    console.log(`\nMatches Played by ${team} away from home: ${filteredAwayResult.length}: `);
                    console.log(top50Message);
                    widgets.displayResults(filteredAwayResult.length == 0 ? `No matches played in ${team}` : filteredAwayResult, 1, () => displayMenu(arr, filterMenu));
                });
                break;
            case '4':
                console.log("Filter Matches Based on Scoreline");
                r1.question("Enter Home Score: ", (homeGoal) => {
                    r1.question("Enter Away Score: ", (awayGoal) => {
                        const filteredScoreline = filterFunctions.scoreline(homeGoal)(awayGoal)(arr);
                        console.log(`\nMatches that has a ${homeGoal}-${awayGoal} scoreline: ${filteredScoreline.length}`)
                        console.log(top50Message);
                        widgets.displayResults(filteredScoreline.length == 0 ? "Match doesn't exist" : filteredScoreline, 1, () => displayMenu(arr, filterMenu));
                    });
                });
                break;
            case '5':
                console.log("Filter Matches Based on Tournament");
                r1.question("Enter Tournament name: ", (tournament) => {
                    const filteredTournamentResult = filterFunctions.tournament(tournament)(arr);
                    console.log(`\nMatches Played in the ${tournament}: ${filteredTournamentResult.length}: `);
                    console.log(top50Message);
                    widgets.displayResults(filteredTournamentResult.length == 0 ? `No matches played in the ${tournament}` : filteredTournamentResult, 1, () => displayMenu(arr, filterMenu));
                });
                break;
            case '6':
                console.log("Filter Matches Based on Country");
                r1.question("Enter Country name: ", (country) => {
                    const filteredCountryResult = filterFunctions.country(country)(arr);
                    console.log(`\nMatches Played in ${country}: ${filteredCountryResult.length}: `);
                    console.log(top50Message);
                    widgets.displayResults(filteredCountryResult.length == 0 ? `No matches played in ${country}` : filteredCountryResult, 1, () => displayMenu(arr, filterMenu));
                });
                break;
            case '7':
                console.log("Filter Matches Based on City");
                r1.question("Enter City name: ", (city) => {
                    const filteredCityResult = filterFunctions.city(city)(arr);
                    console.log(`\nMatches Played in ${city}: ${filteredCityResult.length}: `);
                    console.log(top50Message);
                    widgets.displayResults(filteredCityResult.length == 0 ? `No matches played in ${city}` : filteredCityResult, 1, () => displayMenu(arr, filterMenu));
                });
                break;
            case '8':
                console.log(backMenuMessage);
                displayMenu(arr, mainMenu);
                break;
            default:
                console.log('Invalid choice. Please enter a valid option.');
                displayMenu(arr, filterMenu);
                handleFilterMenuChoice(arr);
        }
    });
}

function handleSearchMenuChoice(arr) {
    r1.question('Choose an option (1-8): ', (choice) => {
        switch (choice) {
            case '1':
                console.log("Search Match Based on Date");
                r1.question("Enter Date (YYYY-MM-DD): ", (date) => {
                    const target = searchFunctions.date(arr, date);
                    console.log(`\nMatch played on ${date}: `)
                    widgets.displayResults(target, 1, () => displayMenu(arr, searchMenu));
                });
                break;
            case '2':
                console.log("Find Matches Based on both Teams and Tournament\n");
                r1.question("Enter home team: ", (home) => {
                    r1.question("Enter away team: ", (away) => {
                        r1.question("Enter tournament: ", (tournament) => {
                            const filteredResult = searchFunctions.countriesAndTournament(home)(away)(tournament)(arr);
                            console.log(`Match played by ${home} and ${away} in the ${tournament}: `);
                            widgets.displayResults(filteredResult.length == 0 ? "Match doesn't exist" : filteredResult, 1, () => displayMenu(arr, searchMenu));
                        });
                    });
                });
                break;
            case '3':
                console.log("Find the Average Goals scored of a specific team\n");
                r1.question("Enter Team name: ", (team) => {
                    const avgGoalsOfTeam = searchFunctions.avgGoalsOfTeam(team, arr);
                    console.log(`\n${team}: ${avgGoalsOfTeam} Average Goals per Game`);
                    displayMenu(arr, searchMenu);
                });
                break;
            case '4':
                console.log("Find the Total Games played of a specific team\n");
                r1.question("Enter Team name: ", (team) => {
                    const result = searchFunctions.totalMatches(team, arr);
                    console.log(`\n${team} played a total of ${result} matches`);
                    displayMenu(arr, searchMenu);
                });
                break;
            case '5':
                console.log("Find the Win Percentage of a specific team\n");
                r1.question("Enter Team name: ", (team) => {
                    const winPercentagePor = searchFunctions.winPercentage(team, arr);
                    console.log(`\n${winPercentagePor}% win percentage for ${team}`);
                    displayMenu(arr, searchMenu);
                });
                break;
            case '6':
                console.log("Find the Unique Countries that played against a specific team\n");
                r1.question("Enter Team name: ", (team) => {
                    const result = searchFunctions.uniqueCountries(team, arr)
                    console.log(`\nCountries that played against ${team}: ${result.length}`);
                    console.table(result);
                    displayMenu(arr, searchMenu);
                });
                break;
            case '7':
                console.log("Find the Total Goals Scored in a Year Range\n");
                r1.question("Enter Starting Year: ", (start_year) => {
                    r1.question("Enter Ending Year: ", (end_year) => {
                        const totalGoals = searchFunctions.totalGoalsYearRange(start_year, end_year, arr);
                        console.log(`\nA total of ${totalGoals} Goals scored from ${start_year} to ${end_year}`);
                        displayMenu(arr, searchMenu);
                    });
                });
                break;
            case '8':
                console.log(backMenuMessage);
                displayMenu(arr, mainMenu);
                break;
            default:
                console.log('Invalid choice. Please enter a valid option.');
                displayMenu(arr, searchMenu);
                handleSearchMenuChoice(arr);
        }
    });
}

function handleMiscMenuChoice(arr) {
    r1.question('Choose an option (1-6): ', (choice) => {
        switch (choice) {
            case '1':
                console.log("Find Matches over a specific goal tally\n");
                r1.question("Enter Total Goal Tally in one game: ", (targetGoals) => {
                    const result = miscFunctions.overGoals(arr, targetGoals)
                    console.log(`\n Matches where the combine goals is more than ${targetGoals}: ${result.length}`);
                    widgets.displayResults(result, 1, () => displayMenu(arr, miscMenu))
                });
                break;
            case '2':
                console.log("Find Number of Victories of a specific team\n");
                r1.question("Enter Team name: ", (targetCountry) => {
                    const result = miscFunctions.teamVictories(targetCountry, arr);
                    console.log(`\nMatches that ${targetCountry} has won at home: ${result.length}`);
                    widgets.displayResults(result, 1, () => displayMenu(arr, miscMenu))
                });
                break;
            case '3':
                console.log("\nMatch with highest number of goals: ");
                console.table(miscFunctions.highestGoalMatch(arr));
                miscMenu(arr)
                break;
            case '4':
                const result = miscFunctions.oddNumberGoals(arr);
                console.log(`\nMatches with odd number total goal tally: ${result.length}`);
                widgets.displayResults(result, 1, () => displayMenu(arr, miscMenu));
                break;
            case '5':
                const goalsArray = Object.entries(miscFunctions.top3(arr)).map(([Country, Goals]) => ({Country, Goals}));
                goalsArray.sort((a, b) => b.Goals - a.Goals);
                const top3 = goalsArray.slice(0, 3);
                console.log("\nTop 3 Countries with the most goals scored: ");
                console.table(top3);
                displayMenu(arr, miscMenu);
                break;
            case '6':
                console.log(backMenuMessage);
                displayMenu(arr, mainMenu);
                break;
            default:
                console.log('Invalid choice. Please enter a valid option.');
                displayMenu(arr, miscMenu);
                handleMiscMenuChoice(arr);
        }
    });
}

module.exports = {
    menu: displayMenu
}
