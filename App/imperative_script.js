const fs = require('fs');

const dataFileContent = fs.readFileSync('results.json', 'utf8');
const resultsArray = JSON.parse(dataFileContent);

if (resultsArray.length === 0) {
    console.log("Array is empty");
    return null;
} else {
    // Sort based on date (recent to past)
    resultsArray.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    });

    // Calculate total goals
    let totalGoals = 0;
    for (let i = 0; i < resultsArray.length; i++) {
        const homeGoals = parseInt(resultsArray[i].home_score);
        const awayGoals = parseInt(resultsArray[i].away_score);
        totalGoals += homeGoals + awayGoals;
    }
    console.log(totalGoals + " Goals scored in all matches\n");

    // Calculate average goals
    let total = 0;
    for (let i = 0; i < resultsArray.length; i++) {
        const homeGoals = parseInt(resultsArray[i].home_score);
        const awayGoals = parseInt(resultsArray[i].away_score);
        total += homeGoals + awayGoals;
    }
    const averageGoals = (total / resultsArray.length).toFixed(2);
    console.log(averageGoals + " Goals per match\n");

    // filter matches based on specific condition
    const home = "Brazil";
    const away = "Germany";
    const tournament = "FIFA World Cup";
    const filteredResult = [];
    for (let i = 0; i < resultsArray.length; i++) {
        if (resultsArray[i].home_team === home && resultsArray[i].away_team === away && resultsArray[i].tournament === tournament) {
            filteredResult.push(resultsArray[i]);
        }
    }
    console.log(`Match played by ${home} and ${away} in the ${tournament}: `);
    console.table(filteredResult.length === 0 ? "Match doesn't exist" : filteredResult);


    // Function to filter matches that were played in a certain city
    function findMatchBasedOnCity(city) {
        const filteredCityResult = [];
        for (let i = 0; i < resultsArray.length; i++) {
            if (resultsArray[i].city === city) {
                filteredCityResult.push(resultsArray[i]);
            }
        }
        return filteredCityResult;
    }
    const city = "London";
    const filteredCityResult = sortDate(findMatchBasedOnCity(city));
    console.log(`\nMatches Played in ${city}: ${filteredCityResult.length}: `);
    console.table(filteredCityResult.length === 0 ? `No matches played in ${city}` : filteredCityResult);

    // Function to filter matches that were played in a certain country
    function findMatchBasedOnCountry(country) {
        const filteredCountryResult = [];
        for (let i = 0; i < resultsArray.length; i++) {
            if (resultsArray[i].country === country) {
                filteredCountryResult.push(resultsArray[i]);
            }
        }
        return filteredCountryResult;
    }
    const country1 = "South Africa";
    const filteredCountryResult = sortDate(findMatchBasedOnCountry(country1));
    console.log(`\nMatches Played in ${country1}: ${filteredCountryResult.length}: `);
    console.table(filteredCountryResult.length === 0 ? `No matches played in ${country1}` : filteredCountryResult);

    // Function to filter matches that were played in a certain tournament
    function findMatchBasedOnTournament(tournament) {
        const filteredTournamentResult = [];
        for (let i = 0; i < resultsArray.length; i++) {
            if (resultsArray[i].tournament === tournament) {
                filteredTournamentResult.push(resultsArray[i]);
            }
        }
        return filteredTournamentResult;
    }
    const tournament1 = "UEFA Euro";
    const filteredTournamentResult = sortDate(findMatchBasedOnTournament(tournament1));
    console.log(`\nMatches Played in the ${tournament1}: ${filteredTournamentResult.length}: `);
    console.table(filteredTournamentResult.length === 0 ? `No matches played in the ${tournament1}` : filteredTournamentResult);

    // Function to filter matches based on specific scoreline
    function findMatchBasedOnScoreline(home, away) {
        const filteredScoreline = [];
        for (let i = 0; i < resultsArray.length; i++) {
            if (resultsArray[i].home_score === home && resultsArray[i].away_score === away) {
                filteredScoreline.push(resultsArray[i]);
            }
        }
        return filteredScoreline;
    }
    const homeGoal = '4';
    const awayGoal = '0';
    const filteredScoreline = findMatchBasedOnScoreline(homeGoal, awayGoal);
    console.log(`\nMatches that have a ${homeGoal}-${awayGoal} scoreline: `);
    console.table(filteredScoreline.length === 0 ? "Match doesn't exist" : filteredScoreline);


    // Curried function to filter matches based on date
    function findMatchBasedOnDate(start, end, resultsArray) {
        const filteredDate = [];
        for (let i = 0; i < resultsArray.length; i++) {
            const resultDate = new Date(resultsArray[i].date);
            if (resultDate >= new Date(start) && resultDate <= new Date(end)) {
                filteredDate.push(resultsArray[i]);
            }
        }
        return filteredDate;
    }

    const startDate = '2020-01-01';
    const endDate = '2023-01-01';
    const filteredDate = findMatchBasedOnDate(startDate, endDate, resultsArray);
    console.log(`\nMatches that are played between ${startDate} and ${endDate}: `);
    console.table(filteredDate.length === 0 ? `No matches played in between ${startDate} and ${endDate}` : filteredDate);

    // Recursive function to find a match at a specific date
    function recursiveFind(arr, targetDate, currentIndex = 0) {
        while (currentIndex < arr.length) {
            if (arr[currentIndex].date === targetDate) {
                return arr[currentIndex];
            }
            currentIndex++;
        }
        return "Match at date is not found.";
    }

    const date = "1876-03-25";
    const target = recursiveFind(resultsArray, date);
    console.log(`\nMatch played on ${date}: `);
    console.table(target);

    // Composed Function to find average goals of a specific team
    function calculateAverageGoalsForTeam(team, arr) {
        const findTeam = (arr) => {
            const filteredTeam = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].home_team === team || arr[i].away_team === team) {
                    filteredTeam.push(arr[i]);
                }
            }
            return filteredTeam;
        };

        const getTotalGoals = (matches) => {
            const goals = [];
            for (let i = 0; i < matches.length; i++) {
                const isHomeTeam = matches[i].home_team === team;
                const isAwayTeam = matches[i].away_team === team;

                if (isHomeTeam || isAwayTeam) {
                    goals.push(isHomeTeam ? parseInt(matches[i].home_score) : parseInt(matches[i].away_score));
                } else {
                    goals.push(0);
                }
            }
            return goals;
        };

        const getAvg = (goals) => {
            let total = 0;
            for (let i = 0; i < goals.length; i++) {
                total += goals[i];
            }
            return (total / goals.length).toFixed(2);
        };

        const filteredTeam = findTeam(arr);
        const totalGoals = getTotalGoals(filteredTeam);
        const avgGoalsOfTeam = getAvg(totalGoals);
        return avgGoalsOfTeam;
    }

    const team = "Malaysia";
    const avgGoalsOfTeam = calculateAverageGoalsForTeam(team, resultsArray);
    console.log(`\n${team}: ${avgGoalsOfTeam} Average Goals per Game`);

    // Sort by Date from year 2000 onwards
    function matchesSinceYear(arr, year) {
        const filteredMatches = [];
        for (let i = 0; i < arr.length; i++) {
            if (parseInt(arr[i].date.split("-")[0]) >= year) {
                filteredMatches.push(arr[i]);
            }
        }
        return filteredMatches.sort((first, second) => new Date(first.date) - new Date(second.date));
    }

    const year = 2000;
    const matchesSince2000 = matchesSinceYear(resultsArray, year);
    console.log(`\n${matchesSince2000.length} matches played since year ${year}`);


    // Composed Function to filter out the amount of matches a specific country has played
    function totalMatchesCountry(country, arr) {
        const findTeam = (arr) => {
            const filteredTeam = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].home_team === country || arr[i].away_team === country) {
                    filteredTeam.push(arr[i]);
                }
            }
            return filteredTeam;
        };
        const getTotalMatches = (arr) => arr.length;

        const filteredTeam = findTeam(arr);
        const totalMatches = getTotalMatches(filteredTeam);
        return totalMatches;
    }

    const country = "England";
    const result = totalMatchesCountry(country, resultsArray);
    console.log(`\n${country} played a total of ${result} matches`);

    // Function to find average goals scored in a chosen year range
    function avgGoalsForYearRange(start_year, end_year, arr) {
        const filteredMatches = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].date.split("-")[0] >= start_year && arr[i].date.split("-")[0] < end_year) {
                filteredMatches.push(arr[i]);
            }
        }

        let totalGoals = 0;
        for (let i = 0; i < filteredMatches.length; i++) {
            const homeGoals = parseInt(filteredMatches[i].home_score);
            const awayGoals = parseInt(filteredMatches[i].away_score);
            totalGoals += homeGoals + awayGoals;
        }

        return totalGoals;
    }

    const startYr = 1980;
    const endYr = 2009;
    const year1980AvgGoals = avgGoalsForYearRange(startYr, endYr, resultsArray);
    console.log(`\n${year1980AvgGoals} Goals scored from ${startYr} to ${endYr}`);

    // Win percentage of a specific team
    function winPercentage(team, arr) {
        const totalMatches = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].home_team === team || arr[i].away_team === team) {
                totalMatches.push(arr[i]);
            }
        }

        let winAmount = 0;
        for (let i = 0; i < totalMatches.length; i++) {
            const isHomeTeam = totalMatches[i].home_team === team;
            const isAwayTeam = totalMatches[i].away_team === team;

            if ((isHomeTeam && totalMatches[i].home_score > totalMatches[i].away_score) ||
                (isAwayTeam && totalMatches[i].away_score > totalMatches[i].home_score)) {
                winAmount++;
            }
        }

        const winRatio = totalMatches.length === 0 ? 0 : (winAmount / totalMatches.length) * 100;
        return winRatio.toFixed(2);
    }

    const targetTeam = "Scotland";
    const winPercentagePor = winPercentage(targetTeam, resultsArray);
    console.log(`\n${winPercentagePor}% win percentage for ${targetTeam}`);

    // Unique countries that played against a specific nation
    const targetNation = "Argentina";
    const uniqueCountries = [];
    for (let i = 0; i < resultsArray.length; i++) {
        if (resultsArray[i].home_team === targetNation || resultsArray[i].away_team === targetNation) {
            uniqueCountries.push(resultsArray[i].home_team === targetNation ? resultsArray[i].away_team : resultsArray[i].home_team);
        }
    }

    const sortedUniqueCountries = Array.from(new Set(uniqueCountries)).sort((a, b) => a.localeCompare(b));
    console.log(`\nCountries that played against ${targetNation}: `);
    console.table(sortedUniqueCountries);



// Random Queries
    // Matches where the home team wins by 5 goals to nil
    const hScore = '5';
    const aScore = '0';
    const filteredArray = (arr) => {
        const filteredMatches = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].home_score === hScore && arr[i].away_score === aScore) {
                filteredMatches.push(arr[i]);
            }
        }
        return filteredMatches;
    };
    console.log(`\n${filteredArray(resultsArray).length} Matches with the scoreline of ${hScore}-${aScore}`);

    // Matches that involve more than 10 goals
    const targetGoals = 10;
    const over10Goals = (arr, totalGoals) => {
        const filteredMatches = [];
        for (let i = 0; i < arr.length; i++) {
            const homeScore = parseInt(arr[i].home_score, 10);
            const awayScore = parseInt(arr[i].away_score, 10);
            if (homeScore + awayScore > totalGoals) {
                filteredMatches.push(arr[i]);
            }
        }
        return filteredMatches;
    };
    console.log(`\n${over10Goals(resultsArray, targetGoals).length} Matches where the combined goals are more than ${targetGoals}`);

    // Amount of matches that were played in Scotland
    const targetCountry = "Scotland";
    const scotlandMatches = [];
    for (let i = 0; i < resultsArray.length; i++) {
        if (resultsArray[i].country === targetCountry) {
            scotlandMatches.push(resultsArray[i]);
        }
    }
    console.log(`\n${scotlandMatches.length} matches played in ${targetCountry}`);

    // Matches where Germany won and was the home team
    const targetCountry2 = "Germany";
    const germanyVictories = [];
    for (let i = 0; i < resultsArray.length; i++) {
        const homeGoals = parseInt(resultsArray[i].home_score);
        const awayGoals = parseInt(resultsArray[i].away_score);
        if (resultsArray[i].home_team === targetCountry2 && homeGoals > awayGoals) {
            germanyVictories.push(resultsArray[i]);
        }
    }
    console.log(`\n${germanyVictories.length} matches that ${targetCountry2} has won`);

    // Match with the highest combined goals
    let highestGoalMatch = resultsArray[0];
    for (let i = 1; i < resultsArray.length; i++) {
        const totalGoalsAcc = parseInt(highestGoalMatch.home_score) + parseInt(highestGoalMatch.away_score);
        const totalGoalsVal = parseInt(resultsArray[i].home_score) + parseInt(resultsArray[i].away_score);
        if (totalGoalsAcc < totalGoalsVal) {
            highestGoalMatch = resultsArray[i];
        }
    }
    console.log("\nMatch with the highest number of goals: ");
    console.table(highestGoalMatch);


    // Total number of friendly matches
    const friendlyMatchesArray = [];
    for (let i = 0; i < resultsArray.length; i++) {
        if (resultsArray[i].tournament === "Friendly") {
            friendlyMatchesArray.push(resultsArray[i]);
        }
    }
    console.log("\nAmount of Friendly Matches: " + friendlyMatchesArray.length);

    // Matches that took place in Kuala Lumpur
    const klMatchesArray = [];
    for (let i = 0; i < resultsArray.length; i++) {
        if (resultsArray[i].city === "Kuala Lumpur") {
            klMatchesArray.push(resultsArray[i]);
        }
    }
    const klMatches = klMatchesArray.length;
    console.log(`\n${klMatches} Matches played in Kuala Lumpur`);
    console.table(klMatchesArray);

    // Matches played in Wales
    const matchesInWales = [];
    for (let i = 0; i < resultsArray.length; i++) {
        if (resultsArray[i].country === "Wales") {
            matchesInWales.push(resultsArray[i]);
        }
    }
    console.log(`\n${matchesInWales.length} Matches played in Wales`);

    // Matches that ended in 0-0
    const nilNilMatches = [];
    for (let i = 0; i < resultsArray.length; i++) {
        if (resultsArray[i].home_score === '0' && resultsArray[i].away_score === '0') {
            nilNilMatches.push(resultsArray[i]);
        }
    }
    console.log(`\n${nilNilMatches.length} Matches that ended in 0-0`);

    // Matches played in Glasgow
    const matchesInGlasgow = [];
    for (let i = 0; i < resultsArray.length; i++) {
        if (resultsArray[i].city === "Glasgow") {
            matchesInGlasgow.push(resultsArray[i]);
        }
    }
    console.log(`\n${matchesInGlasgow.length} Matches played in Glasgow`);

    // Matches with Odd Number of Goals
    const oddNumberGoals = [];
    for (let i = 0; i < resultsArray.length; i++) {
        const homeGoals = parseInt(resultsArray[i].home_score);
        const awayGoals = parseInt(resultsArray[i].away_score);
        if ((homeGoals + awayGoals) % 2 !== 0) {
            oddNumberGoals.push(resultsArray[i]);
        }
    }
    const totalOddNumberGoalsMatches = oddNumberGoals.length;
    console.log("\nMatches with odd number total goal tally: ");
    console.table(totalOddNumberGoalsMatches);

    // Matches played in the 20th Century
    const matchesIn20Cent = [];
    for (let i = 0; i < resultsArray.length; i++) {
        const year = parseInt(resultsArray[i].date.split("-")[0]);
        if (year >= 1900 && year < 1999) {
            matchesIn20Cent.push(resultsArray[i]);
        }
    }
    console.log(`\n${matchesIn20Cent.length} Matches that were played in the 20th Century`);

    // Top 3 Countries with most goals
    const goalsCountries = {};
    for (let i = 0; i < resultsArray.length; i++) {
        const homeTeam = resultsArray[i].home_team;
        const awayTeam = resultsArray[i].away_team;

        goalsCountries[homeTeam] = (goalsCountries[homeTeam] || 0) + parseInt(resultsArray[i].home_score);
        goalsCountries[awayTeam] = (goalsCountries[awayTeam] || 0) + parseInt(resultsArray[i].away_score);
    }

    const goalsArray = [];
    for (const [Country, Goals] of Object.entries(goalsCountries)) {
        goalsArray.push({ Country, Goals });
    }

    goalsArray.sort((a, b) => b.Goals - a.Goals);
    const top3 = goalsArray.slice(0, 3);
    console.log("\nTop 3 Countries with the most goals scored: ");
    console.table(top3);
}
