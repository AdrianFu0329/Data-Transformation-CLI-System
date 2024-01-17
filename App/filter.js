// Function to filter matches that were played in a certain city
function findMatchBasedOnHomeTeam(team) {
    return function(arr) {
        return arr.filter((result) => result.home_team === team);
    }
}


// Function to filter matches that were played in a certain city
function findMatchBasedOnAwayTeam(team) {
    return function(arr) {
        return arr.filter((result) => result.away_team === team);
    }
}


// Function to filter matches that were played in a certain city
function findMatchBasedOnCity(city) {
    return function(arr) {
        return arr.filter((result) => result.city === city);
    }
}


// Function to filter matches that were played in a certain country
function findMatchBasedOnCountry(country) {
    return function(arr) {
        return arr.filter((result) => result.country === country);
    }
}


// Function to filter matches that were played in a certain country
function findMatchBasedOnTournament(tournament) {
    return function(arr) {
        return arr.filter((result) => result.tournament === tournament);
    }
}


// Curried function to filter matches based on specific scoreline
function findMatchBasedOnScoreline(home) {
    return function(away) {
        return function(arr) {
            return arr.filter((result) => result.home_score === home && result.away_score === away);
        }
    }
}


// Curried function to filter matches based on date
function findMatchBasedOnDate(start) {
    return function(end = undefined) {
        const startDate = new Date(start);
        const endDate = end ? new Date(end) : undefined;

        return function(arr) {
            return arr.filter((result) => {
                const resultDate = new Date(result.date);
                return endDate ? resultDate >= startDate && resultDate <= endDate : resultDate >= startDate;
            });
        }
    }
}


module.exports = {
    home_team: findMatchBasedOnHomeTeam,
    away_team: findMatchBasedOnAwayTeam,
    city: findMatchBasedOnCity,
    country: findMatchBasedOnCountry,
    tournament: findMatchBasedOnTournament,
    scoreline: findMatchBasedOnScoreline,
    date: findMatchBasedOnDate
}