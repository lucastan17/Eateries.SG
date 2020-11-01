import { Bar } from 'vue-chartjs'
import database from '../firebase.js'

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
                if (timeNow-y < 6 * 31 * 24 * 60 * 60) {
                    let x = this.datacollection.labels.indexOf(doc.data().Store)
                    if(x == -1) {
                        this.datacollection.labels.push(doc.data().Store)
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