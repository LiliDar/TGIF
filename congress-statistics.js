//Global Variables//
var membersArray = data.results[0].members;



//Statistics//
var statistics = {

    //Number of Democrats, Republicans and Independents//
    "numberDemocrat": stateNumber('D'),
    "numberRepublican": stateNumber('R'),
    "numberIndependent": stateNumber('I'),
    "Total": stateNumber('D') + stateNumber('R') + stateNumber('I'),

    // Democrats and Republicans compare, on average, for voting with their party//
    "averageDemocrat": Math.round(averageVotes('D') / stateNumber('D')),
    "averageRepublican": Math.round(averageVotes('R') / stateNumber('R')),
    "averageIndependent": Math.round(averageVotes('I') / stateNumber('I')),

    //Members which missed the most votes//
    "mostMissedVotes": descendingArray('missed_votes'),

    //Members which missed the least votes//
    "leastMissedVotes": ascendingArray('missed_votes'),

    //Members most often do not vote with their party//
    "leastLoyalVotes": ascendingArray('votes_with_party_pct'),

    //Members most often do vote with their party//
    "mostLoyalVotes": descendingArray('votes_with_party_pct'),
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
stateNumber();

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
averageVotes();

//Highest missed vote percentage / total vote percentage//

function descendingArray(sortkey) {

    membersArray.sort((a, b) => a.key - b.key);

    var empty = [];
    for (var i = 0; i < membersArray.length; i++) {
        if (i < (membersArray.length * 0.1)) {
            empty.push(membersArray[i]);
        } else if (membersArray[i - 1][sortkey] == membersArray[i][sortkey]) {
            empty.push(membersArray[i]);
        } else {
            break;
        }
    }
    return empty;
}
descendingArray();


//Lowest missed vote percentage / total vote percentage//

function ascendingArray(key) {

    membersArray.sort((a, b) => a.key - b.key);

    var tenPercent = membersArray.length * 0.1;
    var tenPercentArray = [];

    for (i = 0; i < membersArray.length; i++) {
        if (i < tenPercent) {
            tenPercentArray.push(membersArray[i])
        } else if (membersArray[i][key] == tenPercentArray[tenPercentArray.length - 1][key]) {
            tenPercentArray.push(membersArray[i]);
        } else {
            break;
        }
    }
    return tenPercentArray;
}
ascendingArray()

//Table to display Party Statistics//

function partyTable() {

    var table = document.getElementById('party-numbers');
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
    independentAverage.innerHTML = statistics.averageIndependent;


    trDemocrat.appendChild(democratParty);
    trDemocrat.appendChild(democratNumber);
    trDemocrat.appendChild(democratAverage);

    trRepublican.appendChild(republicanParty);
    trRepublican.appendChild(republicanNumber);
    trRepublican.appendChild(republicanAverage);

    trIndependent.appendChild(independentParty);
    trIndependent.appendChild(independentNumber);
    trIndependent.appendChild(independentAverage);


    tbodyParty.appendChild(trDemocrat);
    tbodyParty.appendChild(trRepublican);
    tbodyParty.appendChild(trIndependent);

}

partyTable();

//Table to display Least Engaged and Most Loyal//

function descendingTable() {

    var descending = statistics.mostMissedVotes;

    var table = document.getElementById('descending-data');
    var tbody = document.getElementById('tbodyDescending');

    for (i = 0; i < descending.length; i++) {

        var tr = document.createElement('tr');

        var dataName = document.createElement('td');

        if (descending[i].middle_name == null) {
            dataName.innerHTML = (descending[i].first_name + " " + descending[i].last_name);
        } else {
            dataName.innerHTML = (descending[i].first_name + " " + descending[i].middle_name + " " + descending[i].last_name);
        }

        var dataNumber = document.createElement('td');
        dataNumber.innerHTML = descending[i].missed_votes;

        var dataPct = document.createElement('td');
        dataPct.innerHTML = descending[i].missed_votes_pct;

        tr.appendChild(dataName);
        tr.appendChild(dataNumber);
        tr.appendChild(dataPct);
        tbodyDescending.appendChild(tr);
    }

}

descendingTable();









//Table to display Most Engaged and Least Loyal//
