// Curried function to filter matches based on specific condition
function findMatchBasedOnCountriesAndTournament(home) {
    return function(away) {
        return function(tournament) {
            return function(arr) {
                return arr.filter((result) => result.home_team === home && result.away_team === away && result.tournament === tournament);
            }
        }
    }
}


// Recursive function to find a match at a specific date
function recursiveFindDate(arr, targetDate, currentIndex = 0) {
    if (currentIndex >= arr.length) {
        return "Match at date is not found.";
    }

    if (arr[currentIndex].date === targetDate) {
        return arr[currentIndex];
    } else {
        return recursiveFindDate(arr, targetDate, currentIndex + 1);
    }
}


// Function to find a match at a specific date
function findMatchByDate(arr, targetDate) {
    const match = arr.find(result => result.date === targetDate);
    return match ? match : "Match at date is not found.";
}

// Composed Function to find average goals of a specific team
const calculateAverageGoalsForTeam = (team, arr) => {
    const findTeam = (arr) => arr.filter((result) => result.home_team === team || result.away_team === team);
    const getTotalGoals = (matches) => matches.map(match => {
        const isHomeTeam = match.home_team === team;
        const isAwayTeam = match.away_team === team;

        // Checks if team is home or away
        if (isHomeTeam || isAwayTeam) {
            return isHomeTeam ? parseInt(match.home_score) : parseInt(match.away_score);
        } else {
            return 0;
        }
    });
    const getAvg = (goals) => {
        const total = goals.reduce((acc, val) => acc + val, 0);
        return (total / goals.length).toFixed(2);
    }

    const composedFunction = getAvg(getTotalGoals(findTeam(arr)));
    const avgGoalsOfTeam = composedFunction;
    return avgGoalsOfTeam;
}

// Composed Function to filter out the amount of matches a specific country has played 
function totalMatchesCountry(country, arr) {
    const findTeam = (arr) => arr.filter((result) => result.home_team === country || result.away_team === country);
    const getTotalMatches = (arr) => arr.length;

    const composedFunction = getTotalMatches(findTeam(arr));
    const result = composedFunction;
    return result;
}

// Win percentage of a specific team
function winPercentage(team, arr) {
    const totalMatches = 
        arr.filter((result) => result.home_team === team || result.away_team === team);
    
    const winAmount = totalMatches.reduce((acc, match) => {
        const isHomeTeam = match.home_team === team;
        const isAwayTeam = match.away_team === team;

        if ((isHomeTeam && match.home_score > match.away_score) || (isAwayTeam && match.away_score > match.home_score)) {
            return acc + 1;
        } else {
            return acc;
        }
    }, 0);

    const winRatio = totalMatches.length === 0 ? 0 : (winAmount / totalMatches.length) * 100;
    return winRatio.toFixed(2);
}

// Unique countries that played against a specific nation
function uniqueCountries(team, arr) {
    return Array.from(
    // Non repeating values
        new Set(
        arr
            .filter((result) => result.home_team === team || result.away_team === team)
            .map((result) => result.home_team === team ? result.away_team : result.home_team)
        )
    ).sort((a, b) => a.localeCompare(b));
}

// Function to find total goals scored in a chosen year range
function totalGoalsForYearRange(start_year, end_year, arr) {
    function avgGoals1980(results) {
        return results.filter((result) => result.date.split("-")[0] >= start_year && result.date.split("-")[0] < end_year);
    };
    function total(matches) {
        return matches.reduce((acc, val) => {
            const homeGoals = parseInt(val.home_score);
            const awayGoals = parseInt(val.away_score);

            return acc + homeGoals + awayGoals;
        }, 0);
    }
    const composedFunction = total(avgGoals1980(arr));
    const result = composedFunction;
    return result;
}


module.exports = {
    countriesAndTournament: findMatchBasedOnCountriesAndTournament,
    date: findMatchByDate,
    avgGoalsOfTeam: calculateAverageGoalsForTeam,
    totalMatches: totalMatchesCountry,
    winPercentage: winPercentage,
    uniqueCountries: uniqueCountries,
    totalGoalsYearRange: totalGoalsForYearRange,
}