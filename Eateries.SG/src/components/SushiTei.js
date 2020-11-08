import { Bar } from 'vue-chartjs'
import database from '../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],
            datasets: [{
                label: "Total number of People",
                backgroundColor: [],
                data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total number of People in the last 24hours'
            },
            scales: {
                xAxes: [{
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
        database.collection('Eateries').doc('Sushi Tei').collection('Transactions').get().then(querySnapShot => {
            var timeNow = Date.now()/1000
            for (var i = 0; i < 24; i++) {
                this.datacollection.datasets[0].backgroundColor.push('#'+Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'))
            }
            querySnapShot.forEach(doc => {
                var b = doc.data().Time;
                b = b.split(":");
                var y = (Date.parse(doc.data().Date)/1000) + b[0] * 60 * 60 + b[1] * 60; 
                if (Math.abs(timeNow-y) < 23 * 60 * 60) {
                    var hourNow = new Date().getHours()
                    var diff = hourNow-b[0]
                    if(diff < 0 ) {
                      diff += 24;
                    }
                    let x = this.datacollection.labels.indexOf(diff)
                    this.datacollection.datasets[0].data[x] += 1;
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