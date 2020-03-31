// #################################################################################
//       Function to calculate the matches won by teams throughout all the seasons
// ##################################################################################*/
function matchesWonByTeam(matches) {
    let result = {};
    let years = [];
    for(let  match of matches) {
        if(!years.includes(match.season)) {
            years.push(match.season);
        }
        years.forEach(year => {
            result[year] = getResults(matches, year );
        });
    }
    return result;
}

function getResults(matches, year) {
    let matchesWon = {};
    for(let match of matches) {
        let team = match.winner;
        let season = match.season;

        if(season === year && team) {
            matchesWon[team] = (matchesWon[team] || 0) + 1;
        }        
    }
    return matchesWon;
}

module.exports = matchesWonByTeam;
