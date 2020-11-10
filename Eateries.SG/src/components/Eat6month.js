import { Bar } from 'vue-chartjs'
import database from '../firebase.js'
import fb from 'firebase'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Number of Visits",
                backgroundColor: [],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Number of Visits in last 6 month'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
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
      database.collection('Users').doc(fb.auth().currentUser.uid).collection('Transactions').get().then(querySnapShot => {
          var timeNow = Date.now()/1000
          querySnapShot.forEach(doc => {
            var chosentime = doc.data().Time.split(":");
            var bookingtime = (Date.parse(doc.data().Date)/1000) + chosentime[0] * 60 * 60 + chosentime[1] * 60;
            if (timeNow-bookingtime < 6 * 31 * 24 * 60 * 60 && timeNow-bookingtime > 0) { 
                let x = this.datacollection.labels.indexOf(doc.data().Eatery)
                if(x == -1) {
                    this.datacollection.labels.push(doc.data().Eatery)
                    this.datacollection.datasets[0].data.push(1)
                    this.datacollection.datasets[0].backgroundColor.push('#'+Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'))
                } else {
                    this.datacollection.datasets[0].data[x] += 1;
                }
            }
          })
          this.renderChart(this.datacollection, this.options)
    })
  }
},
created () {
    this.fetchItems()
  }
}