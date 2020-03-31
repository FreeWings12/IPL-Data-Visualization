// ###################################################################
//     Function to calculate the top 10 batsmans hitted most sixes
// #####################################################################
function mostSixes(deliveries) {
    const tempResult = {};
    const mostSixesCount = [];

    for (let delivery of deliveries) {
        if (delivery.batsman_runs === '6') {
            tempResult[delivery.batsman] = (tempResult[delivery.batsman] || 0) + 1;
        }
    }

    for (let bastman in tempResult) {
        mostSixesCount.push({
            "Batsman": bastman,
            "Sixes": tempResult[bastman]
        })
    }

    mostSixesCount.sort((a, b) => {
        return b.Sixes - a.Sixes;
    });

    return mostSixesCount.slice(0, 10);
}

module.exports = mostSixes;
