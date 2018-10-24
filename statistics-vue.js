var app = new Vue({

    el: '#main',

    data: {
        membersArray: [],
        allMembers: [],
        statistics: [],
        senate: "https://api.propublica.org/congress/v1/113/senate/members.json",
        house: "https://api.propublica.org/congress/v1/113/house/members.json",
    },

    created() {

        if (location.pathname ==
            "/Users/lilidarvalics/Documents/Ubiqum%20exercises/TGIF/senate-attendance.html" || location.pathname == "/Users/lilidarvalics/Documents/Ubiqum%20exercises/TGIF/senate-loyalty.html") {
            this.getStatisticsData(this.senate);

        } else if (location.pathname ==
            "/Users/lilidarvalics/Documents/Ubiqum%20exercises/TGIF/house-attendance.html" || location.pathname == "/Users/lilidarvalics/Documents/Ubiqum%20exercises/TGIF/house-loyalty.html") {
            this.getStatisticsData(this.house);
        }
    },

    methods: {

        getStatisticsData(link) {
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

                    app.showPage();
                    app.membersArray = json.results[0].members;
                    app.allMembers = json.results[0].members;
                    app.fillStatistics();
                })
        },
        fillStatistics() {
            this.statistics = {
                "numberDemocrat": this.stateNumber('D'),
                "numberRepublican": this.stateNumber('R'),
                "numberIndependent": this.stateNumber('I'),
                "total": this.stateNumber('D') + this.stateNumber('R') + this.stateNumber('I'),
                "averageDemocrat": Math.round(this.averageVotes('D') / this.stateNumber('D')) + '%',
                "averageRepublican": Math.round(this.averageVotes('R') / this.stateNumber('R')) + '%',
                "averageIndependent": Math.round(this.averageVotes('I') / this.stateNumber('I')) + '%',
                "totalAverage": Math.round((this.averageVotes('D') + this.averageVotes('R') + this.averageVotes('I')) / this.membersArray.length) + '%',
                "mostMissedVotes": this.descendingArray('missed_votes_pct'),
                "leastMissedVotes": this.ascendingArray('missed_votes_pct'),
                "leastLoyalVotes": this.ascendingArray('votes_with_party_pct'),
                "mostLoyalVotes": this.descendingArray('votes_with_party_pct'),
            }
        },

        stateNumber(party) {

            var parties = [];

            for (i = 0; i < this.membersArray.length; i++) {
                if (this.membersArray[i].party == party) {
                    parties.push(this.membersArray[i]);
                }
            }
            return parties.length;
        },


        averageVotes(party) {

            var sum = 0;

            for (i = 0; i < this.membersArray.length; i++) {
                if (this.membersArray[i].party == party) {
                    sum += this.membersArray[i].votes_with_party_pct;
                }
            }
            return sum;
        },


        descendingArray(key) {

            this.membersArray.sort((a, b) => b[key] - a[key]);

            var descendingTen = [];

            for (i = 0; i < this.membersArray.length; i++) {

                if (i < (this.membersArray.length * 0.1)) {
                    descendingTen.push(this.membersArray[i])

                } else if (this.membersArray[i][key] == this.membersArray[i - 1][key]) {
                    descendingTen.push(this.membersArray[i])

                } else {
                    break;
                }
            }
            return descendingTen;
        },


        ascendingArray(key) {

            this.membersArray.sort((a, b) => a[key] - b[key]);

            var ascendingTen = [];

            for (i = 0; i < this.membersArray.length; i++) {

                if (i < (this.membersArray.length * 0.1)) {
                    ascendingTen.push(this.membersArray[i])

                } else if (this.membersArray[i][key] == this.membersArray[i - 1][key]) {
                    ascendingTen.push(this.membersArray[i])

                } else {
                    break;
                }
            }
            return ascendingTen;
        },

        showPage: function () {
            document.getElementById("loader").style.display = "none";
            document.getElementById("myDiv").style.display = "block";
        },
    }
})
