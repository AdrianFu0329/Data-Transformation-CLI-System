const constants = require('./constants');
const mainMenu = constants.mainMenu;
const filterMenu = constants.filterMenu;
const searchMenu = constants.searchMenu;
const miscMenu = constants.miscMenu;

function menuHeader(menuOptionsArr) {
    switch (menuOptionsArr) {
        case mainMenu:
            console.log('================================================================================');
            console.log('------------------------------------Main Menu-----------------------------------');
            break;
        case filterMenu:
            console.log('================================================================================');
            console.log('-----------------------------------Filter Menu----------------------------------');
            break;
        case searchMenu:
            console.log('================================================================================');
            console.log('----------------------------------Search Menu-----------------------------------');
            break;
        case miscMenu:
            console.log('================================================================================');
            console.log('-------------------------------Miscellaneous Menu-------------------------------');
            break;
        default:
            return null;
    }  
}  

// Function to get total amount of goals scored in all matches
const calculateTotal = (arr) => arr.reduce((acc, val) => {
    const homeGoals = parseInt(val.home_score);
    const awayGoals = parseInt(val.away_score);

    return acc + homeGoals + awayGoals;
}, 0);


// Function to get average number of goals
const avgGoals = (arr) => (totalFunction) => {
    const total = totalFunction(arr);
    const average = total / arr.length;
    return average.toFixed(2);
};  

// Matches that involves more than 10 goals
function overGoals(arr, totalGoals) {
    return arr.filter((result) => {
        const homeScore = parseInt(result.home_score, 10); 
        const awayScore = parseInt(result.away_score, 10);

        return homeScore + awayScore > totalGoals;
    });
}


// Matches where a team won and was the home team
function teamVictories(targetCountry, arr) {
    return arr.filter((result) => {
        const homeGoals = parseInt(result.home_score);
        const awayGoals = parseInt(result.away_score);
        return result.home_team == targetCountry && homeGoals > awayGoals;
    });
} 


// Match with the highest combined goals
function highestGoalMatch(arr) {
    return arr.reduce((acc, val) => {
        const totalGoalsAcc = parseInt(acc.home_score) + parseInt(acc.away_score);
        const totalGoalsVal = parseInt(val.home_score) + parseInt(val.away_score);
        return totalGoalsAcc >= totalGoalsVal ? acc : val;
    });
} 


// Matches with Odd Number of Goals
const oddNumberGoals = (arr) => arr.filter((result) => {
    const homeGoals = parseInt(result.home_score);
    const awayGoals = parseInt(result.away_score);

    return (homeGoals + awayGoals) % 2 !== 0;
});


// Top 3 Countries with most goals
function goalsCountries(arr) {
    return arr.reduce((acc, val) => {
        const homeTeam = val.home_team;
        const awayTeam = val.away_team;

        acc[homeTeam] = (acc[homeTeam] || 0) + parseInt(val.home_score);
        acc[awayTeam] = (acc[awayTeam] || 0) + parseInt(val.away_score);

        return acc;
    }, {});
}


module.exports = {
    total: calculateTotal,
    avg: avgGoals,
    top3: goalsCountries,
    oddNumberGoals: oddNumberGoals,
    overGoals: overGoals,
    teamVictories: teamVictories,
    highestGoalMatch: highestGoalMatch,
    menuHeader: menuHeader
}