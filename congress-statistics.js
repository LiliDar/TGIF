//Global Variables//
var membersArray = data.results[0].members;


//Statistics//
var statistics = {

    //Number of Democrats, Republicans and Independents//
    "numberDemocrat": 0,
    "numberRepublican": 0,
    "numberIndependent": 0,

    // Democrats and Republicans compare, on average, for voting with their party//
    "averageDemocrat": 0,
    "averageRepublican": 0,
    "averageIndependent": 0,

    //Members which missed the most votes//
    "mostMissedVotes": 0,

    //Members which missed the least votes//
    "leastMissedVotes": 0,

    //Members most often do not vote with their party//
    "VoteLeastDemocrat": 0,
    "VoteLeastRepublican": 0,
    "VoteLeastindependent": 0,

    //Members most often do vote with their party//
    "voteOftenDemocrat": 0,
    "voteOftenRepublican": 0,
    "voteOftenIndependent": 0,


}

//Finding number of members in each party//

function stateNumber() {
    var democrat = [];
    var republican = [];
    var independent = [];

    for (i = 0; i < membersArray.length; i++) {
        if (membersArray[i].party == "D") {
            democrat.push(membersArray[i]);
        }
        if (membersArray[i].party == "R") {
            republican.push(membersArray[i]);

        }
        if (membersArray[i].party == "I") {
            independent.push(membersArray[i]);
        }
    }
    statistics.numberDemocrat = democrat.length;
    statistics.numberRepublican = republican.length;
    statistics.numberIndependent = independent.length;
}
stateNumber();

//Average "Votes with Party" for each party//

//Democrat//
function democratVotes() {
    var Sum = 0;
    var Length = statistics.numberDemocrat;

    for (i = 0; i < membersArray.length; i++) {
        if (membersArray[i].party == "D") {
            Sum = Sum + membersArray[i].votes_with_party_pct;
        }
    }
    var Average = Sum / Length;
    statistics.averageDemocrat = Average;
}
democratVotes();

//Republican//
function republicanVotes() {
    var Sum = 0;
    var Length = statistics.numberRepublican;

    for (i = 0; i < membersArray.length; i++) {
        if (membersArray[i].party == "R") {
            Sum = Sum + membersArray[i].votes_with_party_pct;
        }
    }
    var Average = Sum / Length;
    statistics.averageRepublican = Average;
}
republicanVotes();

//Independent//
function independentVotes() {
    var Sum = 0;
    var Length = statistics.numberIndependent;

    for (i = 0; i < membersArray.length; i++) {
        if (membersArray[i].party == "I") {
            Sum = Sum + membersArray[i].votes_with_party_pct;
        }
    }
    var Average = Sum / Length;
    statistics.averageIndependent = Average;
}
independentVotes();

//ATTENDANCE//

//Engagement// 

//Highest missed vote percentage//

function leastVoters() {
    membersArray.sort((a, b) => b.missed_votes_pct - a.missed_votes_pct);
    var bottomTen = membersArray.length * 0.1;
    var bottomTenLeastArray = [];
    for (i = 0; i < membersArray.length; i++) {
        if (i < bottomTen) {
            bottomTenLeastArray.push(membersArray[i])
        } else if (membersArray[i].missed_votes_pct == bottomTenLeastArray[bottomTenLeastArray.length - 1].missed_votes_pct) {
            bottomTenLeastArray.push(membersArray[i]);
        } else {
            break;
        }
    }
    console.log(bottomTenLeastArray);
    return bottomTenLeastArray;
}
leastVoters()

//Lowest missed vote percentage//

function mostVoters() {
    membersArray.sort((a, b) => a.missed_votes_pct - b.missed_votes_pct);
    var topTen = membersArray.length * 0.1;
    var topTenLeastArray = [];
    for (i = 0; i < membersArray.length; i++) {
        if (i < topTen) {
            topTenLeastArray.push(membersArray[i])
        } else if (membersArray[i].missed_votes_pct == topTenLeastArray[topTenLeastArray.length - 1].missed_votes_pct) {
            topTenLeastArray.push(membersArray[i]);
        } else {
            break;
        }
    }
    console.log(topTenLeastArray);
    return topTenLeastArray;
}
mostVoters()


//PARTY LOYALTY//

//Least loyal members//

function leastLoyal() {
    membersArray.sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct);
    var bottomTen = membersArray.length * 0.1;
    var bottomTenLeastArray = [];
    for (i = 0; i < membersArray.length; i++) {
        if (i < bottomTen) {
            bottomTenLeastArray.push(membersArray[i])
        } else if (membersArray[i].votes_with_party_pct == bottomTenLeastArray[bottomTenLeastArray.length - 1].votes_with_party_pct) {
            bottomTenLeastArray.push(membersArray[i]);
        } else {
            break;
        }
    }
    console.log(bottomTenLeastArray);
    return bottomTenLeastArray;
}
leastLoyal()

//Most loyal members//

function mostLoyal() {
    membersArray.sort((a, b) => b.votes_with_party_pct - a.votes_with_party_pct);
    var topTen = membersArray.length * 0.1;
    var topTenLeastArray = [];
    for (i = 0; i < membersArray.length; i++) {
        if (i < topTen) {
            topTenLeastArray.push(membersArray[i])
        } else if (membersArray[i].votes_with_party_pct == topTenLeastArray[topTenLeastArray.length - 1].votes_with_party_pct) {
            topTenLeastArray.push(membersArray[i]);
        } else {
            break;
        }
    }
    console.log(topTenLeastArray);
    return topTenLeastArray;
}
mostLoyal()
