import { Line } from 'vue-chartjs';
import database from '../firebase.js';
import fb from 'firebase';

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: ["5 months ago","4 months ago","3 months ago","2 months ago", "1 months ago", "0 months ago"],
            datasets: [{
                data: [0,0,0,0,0,0],
                label: "Total Spending",
                borderColor: "#3e95cd",
                fill: false
              }
            ]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total spending in last 5 months'
            },
            scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: false
                  }
              }]
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
      database.collection('Users').doc(fb.auth().currentUser.uid).collection('Transactions').orderBy('Date').get().then(querySnapShot => {
        var timeNow = Date.now()/1000
        querySnapShot.forEach(doc => {
          var chosentime = doc.data().Time.split(":");
          var bookingtime = (Date.parse(doc.data().Date)/1000) + chosentime[0] * 60 * 60 + chosentime[1] * 60;
          var temp = timeNow
          if (temp > bookingtime) { //only extract past data
            temp -= bookingtime
            temp = Math.floor(temp/2629746) //convert seconds to months
            if (temp <= 5) {
              this.datacollection.datasets[0].data[5 - temp] +=  doc.data().Amount
            } 
          }
        })
        this.renderChart(this.datacollection, this.options)
      })
    }

/*      
        database.collection('stuff').doc('gmJX3VpOcpE8MF8cgANo').collection('transaction').orderBy('Time').get().then(querySnapShot => {
            var monthNow = new Date().getMonth()
            querySnapShot.forEach(doc => {
                var y = doc.data().Time.toDate().getMonth()
                this.datacollection.datasets[0].data[Math.abs(monthNow-y)] +=  doc.data().Amount 
            })
            this.renderChart(this.datacollection, this.options)
        })
*/
  },
  created () {
    this.fetchItems()
  }
}
