const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const matchesWonByTeam = require("./ipl/matchesWonByTeam");
const extraRunsByTeam = require("./ipl/extraRunsByTeam");
const economicalBowlers = require("./ipl/economicalBowlers");
const mostSixes = require("./ipl/mostSixes");
const mostOutByLbw = require("./ipl/mostOutByLbw");

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";

function main() {
    csv()
        .fromFile(MATCHES_FILE_PATH)
        .then((matches) => {
            csv()
                .fromFile(DELIVERIES_FILE_PATH)
                .then(deleveries => {
                    let result = matchesPlayedPerYear(matches);
                    let matchWonResult = matchesWonByTeam(matches);
                    let extraRunsResult = extraRunsByTeam(matches, deleveries);
                    let economicalBowlersResult = economicalBowlers(matches, deleveries);
                    let mostSixesResult = mostSixes(deleveries);
                    let mostOutByLbwResult = mostOutByLbw(deleveries);

                    saveMatchesResults(result, matchWonResult, extraRunsResult, economicalBowlersResult, mostSixesResult, mostOutByLbwResult);

                });

        });
}

function saveMatchesResults(result, matchWonResult, extraRunsResult, economicalBowlersResult, mostSixesResult, mostOutByLbwResult) {
    const jsonData = {
        matchesPlayedPerYear: result,
        matchesWonByTeam: matchWonResult,
        extraRunsByTeam: extraRunsResult,
        economicalBowlers: economicalBowlersResult,
        mostSixes: mostSixesResult,
        mostOutByLbw: mostOutByLbwResult,
    };

    const jsonString = JSON.stringify(jsonData);
    fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
        if (err) {
            console.error(err);
        }
    });
}

main();
