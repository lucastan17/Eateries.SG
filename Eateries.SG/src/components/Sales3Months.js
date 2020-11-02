import { HorizontalBar  } from 'vue-chartjs'
import database from '../firebase.js'

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
              text: 'Amount spent in last 3 month'
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
        database.collection('stuff').doc('gmJX3VpOcpE8MF8cgANo').collection('transaction').get().then(querySnapShot => {
            var timeNow = Date.now()/1000
            querySnapShot.forEach(doc => {
                var y = (doc.data().Time).toDate().getTime() / 1000
                if (timeNow-y < 3 * 31 * 24 * 60 * 60) { 
                    let x = this.datacollection.labels.indexOf(doc.data().Store)
                    if(x == -1) {
                        this.datacollection.labels.push(doc.data().Store)
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