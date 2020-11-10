import { HorizontalBar  } from 'vue-chartjs'
import database from '../firebase.js'
import fb from 'firebase'

export default {
  extends: HorizontalBar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Total amount spent",
                backgroundColor: [],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Amount spent in last 6 months'
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false,
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
                    this.datacollection.datasets[0].data.push(doc.data().Amount)
                    this.datacollection.datasets[0].backgroundColor.push('#'+Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'))
                } else {
                    this.datacollection.datasets[0].data[x] += doc.data().Amount;
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