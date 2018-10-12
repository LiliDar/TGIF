//Global Variables//
var membersArray = data.results[0].members;
var dropdown = document.getElementById('states');

var democrat = document.getElementById('democrat');
democrat.addEventListener('click', function () {
    var arrayFilter = myFilter();
    myTable(arrayFilter);
});

var republican = document.getElementById('republican');
republican.addEventListener('click', function () {
    var arrayFilter = myFilter();
    myTable(arrayFilter);
});

var independent = document.getElementById('independent');
independent.addEventListener('click', function () {
    var arrayFilter = myFilter();
    myTable(arrayFilter);
});


dropdown.addEventListener('change', function () {
    var arrayFilter = myFilter();
    myTable(arrayFilter);
});


//Creating a Table//
function myTable(array) {
    var table = document.getElementById('senate-data');
    var tbody = document.getElementById('tbody');
    tbody.innerHTML = "";

    for (i = 0; i < array.length; i++) {

        var tr = document.createElement('tr');

        var dataName = document.createElement('td');

        if (array[i].middle_name == null) {
            dataName.innerHTML = (array[i].first_name + " " + array[i].last_name).link(array[i].url);
        } else {
            dataName.innerHTML = (array[i].first_name + " " + array[i].middle_name + " " + array[i].last_name).link(array[i].url);
        }

        var dataParty = document.createElement('td');
        dataParty.innerHTML = array[i].party;

        var dataState = document.createElement('td');
        dataState.innerHTML = array[i].state;

        var dataSenior = document.createElement('td');
        dataSenior.innerHTML = array[i].seniority;

        var dataVotes = document.createElement('td');
        dataVotes.innerHTML = array[i].votes_with_party_pct + '%';

        tr.appendChild(dataName);
        tr.appendChild(dataParty);
        tr.appendChild(dataState);
        tr.appendChild(dataSenior);
        tr.appendChild(dataVotes);
        tbody.appendChild(tr);
    }
}


//Creating filter function//
function myFilter() {
    var empty = [];
    for (i = 0; i < membersArray.length; i++) {
        //Filter list of 50 states//
        if (dropdown.value == membersArray[i].state || dropdown.value == 'All') {

            if (democrat.checked && membersArray[i].party == "D") {
                empty.push(membersArray[i]);
            }
            if (republican.checked && membersArray[i].party == "R") {
                empty.push(membersArray[i]);
            }
            if (independent.checked && membersArray[i].party == "I") {
                empty.push(membersArray[i]);
            }
        }
    }
    return empty;
}


//Get rid of Duplicates//
function duplicateStates() {
    var duplicates = [];
    for (i = 0; i < membersArray.length; i++) {
        for (j = i + 1; j < membersArray.length; j++) {
            if (membersArray[i].state == membersArray[j].state && !duplicates.includes(membersArray[i].state)) {
                duplicates.push(membersArray[i].state);
            }
        }
    }
    return duplicates;
}
duplicateStates();

//Append to Dropdown//
function myStates() {
    var array = duplicateStates();

    for (i = 0; i < array.length; i++) {
        var option = document.createElement('option');
        option.innerHTML = array[i];
        dropdown.appendChild(option);
    }

}
myStates();
