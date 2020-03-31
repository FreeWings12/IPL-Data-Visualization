// ######################################################################
//     Function to calculate the top 10 batsmans who out by LBW highest
// #######################################################################
function mostOutByLbw(deliveries) {
    const tempResult = {};
    const  lbwCount = [];
    
    for(let delivery of deliveries) {
        if(delivery.dismissal_kind === 'lbw') {
            tempResult[delivery.batsman] = (tempResult[delivery.batsman] || 0) + 1;
        }
    }

    for(let bastman in tempResult) {
        lbwCount.push({"Batsman": bastman, "Dismissed": tempResult[bastman]})
    }
    
    lbwCount.sort( (a, b) => {
        return b.Dismissed - a.Dismissed;
    });

    return lbwCount.slice(0, 10);
}

module.exports = mostOutByLbw;