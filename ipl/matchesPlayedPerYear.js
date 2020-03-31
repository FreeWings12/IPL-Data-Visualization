function matchesPlayedPerYear(matches) {
    const result = {};
    for (let match of matches) {
        const season = match.season;
        result[season] = (result[season] || 0) + 1;
    }
    return result;
}

module.exports = matchesPlayedPerYear;
