//Fetching data from server//

if (location.pathname == "/Users/lilidarvalics/Desktop/TGIF/senate-attendance.html" || location.pathname == "/Users/lilidarvalics/Desktop/TGIF/senate-loyalty.html") {
    getStatisticsData("https://api.propublica.org/congress/v1/113/senate/members.json");

} else if (location.pathname == "/Users/lilidarvalics/Desktop/TGIF/house-attendance.html" || location.pathname == "/Users/lilidarvalics/Desktop/TGIF/house-loyalty.html") {
    getStatisticsData("https://api.propublica.org/congress/v1/113/house/members.json");
}

function getStatisticsData(link) {
    fetch(link, {
            "method": "GET",
            "headers": {
                'X-API-Key': "7UGw37brAbAI6CFkEv0vrCECV5DcM04LcBp37ZqK"
            }
        })
        .then(r => r.json())
        .then(json => {
            console.log(json);
            data = json;

            membersArray = data.results[0].members;

            statistics = {

                //Number of Democrats, Republicans and Independents//
                "numberDemocrat": stateNumber('D'),
                "numberRepublican": stateNumber('R'),
                "numberIndependent": stateNumber('I'),
                "Total": stateNumber('D') + stateNumber('R') + stateNumber('I'),

                // Democrats and Republicans compare, on average, for voting with their party//
                "averageDemocrat": Math.round(averageVotes('D') / stateNumber('D')) + '%',
                "averageRepublican": Math.round(averageVotes('R') / stateNumber('R')) + '%',
                "averageIndependent": Math.round(averageVotes('I') / stateNumber('I')) + '%',
                "totalAverage": Math.round((averageVotes('D') + averageVotes('R') + averageVotes('I')) / membersArray.length) + '%',

                //Members which missed the most votes//
                "mostMissedVotes": descendingArray('missed_votes_pct'),


                //Members which missed the least votes//
                "leastMissedVotes": ascendingArray('missed_votes_pct'),


                //Members most often do not vote with their party//
                "leastLoyalVotes": ascendingArray('votes_with_party_pct'),


                //Members most often do vote with their party//
                "mostLoyalVotes": descendingArray('votes_with_party_pct'),
            }
            partyTable();

            if (location.pathname == "/Users/lilidarvalics/Desktop/TGIF/senate-loyalty.html" || location.pathname == "/Users/lilidarvalics/Desktop/TGIF/house-loyalty.html") {

                dataTable(statistics['leastLoyalVotes'], 'loyalBottom', 'total_votes', 'votes_with_party_pct')

                dataTable(statistics['mostLoyalVotes'], 'loyalTop', 'total_votes', 'votes_with_party_pct')
            }

            if (location.pathname == "/Users/lilidarvalics/Desktop/TGIF/senate-attendance.html" || location.pathname == "/Users/lilidarvalics/Desktop/TGIF/house-attendance.html") {

                dataTable(statistics['mostMissedVotes'], 'votesBottom', 'missed_votes', 'missed_votes_pct');

                dataTable(statistics['leastMissedVotes'], 'votesTop', 'missed_votes', 'missed_votes_pct')
            }
        })
}

//Finding number of members in each party//

function stateNumber(party) {

    var parties = [];

    for (i = 0; i < membersArray.length; i++) {
        if (membersArray[i].party == party) {
            parties.push(membersArray[i]);
        }
    }
    return parties.length;
}

//Average "Votes with Party"//

function averageVotes(party) {

    var Sum = 0;

    for (i = 0; i < membersArray.length; i++) {
        if (membersArray[i].party == party) {
            Sum += membersArray[i].votes_with_party_pct;
        }
    }
    return Sum;
}

//Highest missed vote percentage / total vote percentage//

function descendingArray(key) {

    membersArray.sort((a, b) => b[key] - a[key]);

    var descendingTen = [];

    for (i = 0; i < membersArray.length; i++) {

        if (i < (membersArray.length * 0.1)) {
            descendingTen.push(membersArray[i])

        } else if (membersArray[i][key] == membersArray[i - 1][key]) {
            descendingTen.push(membersArray[i])

        } else {
            break;
        }
    }
    return descendingTen;
}

//Lowest missed vote percentage / total vote percentage//

function ascendingArray(key) {

    membersArray.sort((a, b) => a[key] - b[key]);

    var ascendingTen = [];

    for (i = 0; i < membersArray.length; i++) {

        if (i < (membersArray.length * 0.1)) {
            ascendingTen.push(membersArray[i])

        } else if (membersArray[i][key] == membersArray[i - 1][key]) {
            ascendingTen.push(membersArray[i])

        } else {
            break;
        }
    }
    return ascendingTen;
}

//Table to display Party Statistics//

function partyTable() {

    var tbody = document.getElementById('tbodyParty');

    //Democrat Row//
    var trDemocrat = document.createElement('tr');

    var democratParty = document.createElement('td');
    democratParty.innerHTML = 'Democrat';

    var democratNumber = document.createElement('td');
    democratNumber.innerHTML = statistics['numberDemocrat'];

    var democratAverage = document.createElement('td');
    democratAverage.innerHTML = statistics.averageDemocrat;

    //Republican Row//
    var trRepublican = document.createElement('tr');

    var republicanParty = document.createElement('td');
    republicanParty.innerHTML = 'Republican';

    var republicanNumber = document.createElement('td');
    republicanNumber.innerHTML = statistics.numberRepublican;

    var republicanAverage = document.createElement('td');
    republicanAverage.innerHTML = statistics.averageRepublican;

    //Independent Row//
    var trIndependent = document.createElement('tr');

    var independentParty = document.createElement('td');
    independentParty.innerHTML = 'Independent';

    var independentNumber = document.createElement('td');
    independentNumber.innerHTML = statistics.numberIndependent;
    var independentAverage = document.createElement('td');

    if (statistics.averageIndependent === "NaN%") {
        independentAverage.innerHTML = '0%';
    } else {
        independentAverage.innerHTML = statistics.averageIndependent;
    }

    //Total//
    var trTotal = document.createElement('tr');

    var total = document.createElement('td');
    total.innerHTML = 'Total';

    var totalNumbers = document.createElement('td');
    totalNumbers.innerHTML = statistics.Total;

    var totalAverage = document.createElement('td');
    totalAverage.innerHTML = statistics.totalAverage;


    trDemocrat.appendChild(democratParty);
    trDemocrat.appendChild(democratNumber);
    trDemocrat.appendChild(democratAverage);

    trRepublican.appendChild(republicanParty);
    trRepublican.appendChild(republicanNumber);
    trRepublican.appendChild(republicanAverage);

    trIndependent.appendChild(independentParty);
    trIndependent.appendChild(independentNumber);
    trIndependent.appendChild(independentAverage);

    trTotal.appendChild(total);
    trTotal.appendChild(totalNumbers);
    trTotal.appendChild(totalAverage);

    tbodyParty.appendChild(trDemocrat);
    tbodyParty.appendChild(trRepublican);
    tbodyParty.appendChild(trIndependent);
    tbodyParty.appendChild(trTotal);

}

//Table to display Least Engaged and Most Loyal//

function dataTable(array, id, votes, percent) {

    var tableData = array;

    var tbody = document.getElementById(id);

    for (i = 0; i < tableData.length; i++) {


        var tr = document.createElement('tr');

        var dataName = document.createElement('td');

        if (tableData[i].middle_name == null) {
            dataName.innerHTML = (tableData[i].first_name + " " + tableData[i].last_name).link(tableData[i].url);
        } else {
            dataName.innerHTML = (tableData[i].first_name + " " + tableData[i].middle_name + " " + tableData[i].last_name).link(tableData[i].url);
        }

        var dataNumber = document.createElement('td');
        dataNumber.innerHTML = tableData[i][votes];

        var dataPct = document.createElement('td');
        dataPct.innerHTML = tableData[i][percent] + '%';

        tr.appendChild(dataName);
        tr.appendChild(dataNumber);
        tr.appendChild(dataPct);
        tbody.appendChild(tr);
    }
}





