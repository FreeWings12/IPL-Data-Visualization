// ###################################################################
//     Function to calculate the top 10 economical bowler in 2015
// #####################################################################
function economicalBowlers(matches, deliveries) {
    let concededRuns = {};
    let totalBalls = {};

    for (let match of matches) {
        let season = match.season;
        if (season === '2015') {
            for (let delivery of deliveries) {

                if (match.id === delivery.match_id) {
                    let runs = (parseInt(delivery.total_runs) - parseInt(delivery.legbye_runs) + parseInt(delivery.penalty_runs) + parseInt(delivery.bye_runs));
                    concededRuns[delivery.bowler] = (concededRuns[delivery.bowler] || 0) + runs;
                    let count = parseInt(delivery.wide_runs) + parseInt(delivery.noball_runs);
                    if (count === 0) {
                        totalBalls[delivery.bowler] = (totalBalls[delivery.bowler] || 0) + 1;
                    }
                }
            }
        }
    }

    const bowlersWithEconomy = [];
    for (let bowler in concededRuns) {
        let economy = (parseFloat(concededRuns[bowler]) / parseFloat(totalBalls[bowler]) * 6).toFixed(2);
        bowlersWithEconomy.push({
            bowler,
            economy
        });
    }

    bowlersWithEconomy.sort((a, b) => {
        return a.economy - b.economy;
    });

    return bowlersWithEconomy.slice(0, 10);
}


module.exports = economicalBowlers;
