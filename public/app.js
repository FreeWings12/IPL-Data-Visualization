function fetchAndVisualizeData() {
    fetch("./data.json")
        .then(r => r.json())
        .then(visualizeData);
}

fetchAndVisualizeData();

function visualizeData(data) {
    visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
    visualizeMatchesWonByTeam(data.matchesWonByTeam);
    visualizeExtraRunsByTeam(data.extraRunsByTeam);
    visualizeEconomicalBowlers(data.economicalBowlers);
    visualizeMostSixesHitters(data.mostSixes);
    visualizeMostOutByLbw(data.mostOutByLbw);
    return;
}


function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
    const seriesData = [];
    for (let year in matchesPlayedPerYear) {
        seriesData.push([year, matchesPlayedPerYear[year]]);
    }

    Highcharts.chart("matches-played-per-year", {
        chart: {
            type: "column"
        },
        title: {
            text: "Matches Played Per Year"
        },
        subtitle: {
            text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
        },
        xAxis: {
            type: "category"
        },
        yAxis: {
            min: 0,
            title: {
                text: "Matches Played Per Year"
            }
        },
        tooltip: {
            pointFormat: '<tr><td style="padding:0">Matches: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        },
        series: [{
            name: "Years",
            data: seriesData,

            dataLabels: {
                enabled: true,
                rotation: 0,
                color: '#FFF',
                align: 'center',
                // format: '{point.y:.1f}', // one decimal
                y: 50, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                    fontStyle: 'normal',
                }
            }
        }]
    });
}

//Function to visualize matches won by team
function visualizeMatchesWonByTeam(matchesWonByTeam) {
    const seriesData = [];
    let seasons = Object.keys(matchesWonByTeam);

    const teams = [];
    for (let year in matchesWonByTeam) {
        for (let team in matchesWonByTeam[year]) {
            !teams.includes(team) ? teams.push(team) : false;
        }
    }

    //Loop to get the data for each team separately
    for (let i = 0; i < teams.length; i++) {
        const data = [];
        const tempData = {};
        for (let j = 0; j < seasons.length; j++) {
            let teamExists = false;
            for (let year in matchesWonByTeam) {
                if (year === seasons[j]) {
                    let teamName = Object.keys(matchesWonByTeam[year]);
                    if (teamName.indexOf(teams[i]) >= 0) {
                        teamExists = true;
                    }
                }
            }
            teamExists ? data.push(matchesWonByTeam[seasons[j]][teams[i]]) : data.push(0);
        }
        tempData["name"] = teams[i];
        tempData["data"] = data;
        seriesData.push(tempData);
    }

    Highcharts.chart('matches-won-by-team', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Matches Won By Team Per Year'
        },
        subtitle: {
            text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
        },
        xAxis: {
            categories: seasons,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Matches Won'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: seriesData,
    });

}


//Function to visualize extra runs given by the teams in 2016
function visualizeExtraRunsByTeam(extraRunsByTeam) {
    const seriesData = [];
    for (let team in extraRunsByTeam) {
        seriesData.push([team, extraRunsByTeam[team]]);
    }

    Highcharts.chart("extra-runs-by-team", {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Extra Runs By Teams In 2016'
        },
        subtitle: {
            text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 30,
            title: {
                text: "Extra Runs"
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: '<tr><td style="padding:0">Extra Runs: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        },
        series: [{
            name: "Teams",
            data: seriesData,
            dataLabels: {
                enabled: true,
                rotation: 0,
                color: '#FFF',
                align: 'center',
                // format: '{point.y:.1f}', // one decimal
                y: 50, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                }
            }
        }]
    });
}


//Function to visualize top 10 economical bowlers in 2015
function visualizeEconomicalBowlers(economicalBowlers) {
    const seriesData = [];
    for (let bowler in economicalBowlers) {
        seriesData.push([economicalBowlers[bowler]["bowler"], parseFloat(economicalBowlers[bowler]["economy"])]);
    }

    Highcharts.chart("economical-bowlers-2015", {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Top 10 Economical Bowler In 2015'
        },
        subtitle: {
            text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: "Economy"
            }
        },
        legend: {
            enabled: true
        },
        tooltip: {
            pointFormat: '<tr><td style="padding:0">Economy: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        },
        series: [{
            name: "Players",
            data: seriesData,
            dataLabels: {
                enabled: true,
                rotation: 0,
                color: '#FFF',
                align: 'center',
                format: '{point.y:.1f}', // one decimal
                y: 50, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                }
            }
        }]
    });
}

//Function to visualize top 10 six hitters
function visualizeMostSixesHitters(mostSixes) {
    const seriesData = [];
    const batsmanNames = []
    for (let batsman of mostSixes) {
        seriesData.push([batsman["Batsman"], batsman["Sixes"]]);
        batsmanNames.push(batsman["Batsman"]);
    }
    var chart = Highcharts.chart('most-sixes-by-batsman', {
        title: {
            text: 'Top 10 Six Hitters In IPL'
        },

        subtitle: {
            text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
        },
        xAxis: {
            type: 'category',
            categories: batsmanNames,
            labels: {
                rotation: 0,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        series: [{
            type: 'column',
            name: "Sixes",
            colorByPoint: true,
            data: seriesData,
            showInLegend: false,

            dataLabels: {
                enabled: true,
                rotation: 0,
                color: '#FFF',
                align: 'center',
                // format: '{point.y:.1f}', // one decimal
                y: 50, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                }
            }
        }]
    });
}


//Function to visualize top 10 batsman who mostly out by lbw
function visualizeMostOutByLbw(mostOutByLbw) {
    const seriesData = [];
    const batsmanNames = []

    for (let batsman of mostOutByLbw) {
        seriesData.push([batsman["Batsman"], batsman["Dismissed"]]);
        batsmanNames.push(batsman["Batsman"]);
    }

    Highcharts.chart('most-lbw-out-batsman', {

        title: {
            text: 'Top 10 Most LBW Dismissal Batsman'
        },

        subtitle: {
            text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
        },

        xAxis: {
            categories: batsmanNames,
        },

        series: [{
            type: 'column',
            colorByPoint: true,
            data: seriesData,
            showInLegend: false,
            dataLabels: {
                enabled: true,
                rotation: 0,
                color: '#FFF',
                align: 'center',
                // format: '{point.y:.1f}', // one decimal
                y: 50, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                }
            }
        }]
    });
}
