<template>
<body>
    <div data-collapse="medium" data-animation="default" data-duration="400" id="Navigation">
        <div class="navigation-container">
            <div class="navigation-left"><img src="..\assets\EateriesSG.svg" loading="lazy" width="83" height="auto">
                <div class="logo-text">EATERIES.SG</div>
            </div>
            <div class="navigation-right">
                <router-link class = "link" to="/home" exact>Home</router-link>
                <router-link class = "link" to="/profile" exact>Profile</router-link>
                <router-link class = "current" to="/history" exact>History</router-link>
                <router-link class = "link" to="/partnereateries" exact>Partner Eateries</router-link>
                <router-link class = "link" to="/currentbookings" exact>Current Bookings</router-link>
                <router-link class = "link" to="/declaration" exact>Declaration</router-link>
                <button class="SObutton" @click ="signOut()"><img src="..\assets\logout.svg" style="width:24px; height:22px; float:left">Logout</button>
            </div>
        </div>
    </div>
    <div id="Header" class="header">
        <div id="container-flex">
            <div class="head-content">
                <h1>History</h1>
                <h4>Travel back in time!</h4>
            </div>
        </div>
    </div>
    <div class="container">
        <div>
            <h2>Display a chart of your choice by clicking on any of the following buttons</h2><br>
        </div>
        <div class="container">
            <h4>View Visualisations of the past eateries visited</h4>
            <div>
                <div class="buttonList">
                    <div class="sort-font"><strong>Over the past:</strong></div>
                    <button class="button" v-on:click="MonthEat(1)">Last 1 Month</button>
                    <button class="button" v-on:click="MonthEat(3)">Last 3 Months</button>
                    <button class="button" v-on:click="MonthEat(6)">Last 6 months</button>
                </div>
                <div class = "graphcol">
                    <div v-if="display1 == true">
                        <chart1></chart1>
                    </div>
                    <div v-if="display2 == true">
                        <chart2></chart2>
                    </div>
                    <div v-if="display3 == true">
                        <chart3></chart3>
                    </div>
                    <!--img src="..\assets\breadyard.jpg" loading="lazy" alt=""-->
                </div>
            </div>
        </div><br><br><br><br><br><br>
        <div class="container">
            <h4>View Visualisations of the past transactions (in SG$)</h4>
            <div class="buttonList">
                <div class="sort-font"><strong>Over the past:</strong></div>
                <button class="button" v-on:click="MonthSales(1)">Last 1 Month</button>
                <button class="button" v-on:click="MonthSales(3)">Last 3 Months</button>
                <button class="button" v-on:click="MonthSales(6)">Last 6 months</button>
            </div>
            <div>
                <div v-if="display4 == true">
                    <chart4></chart4>
                </div>
                <div v-if="display5 == true">
                    <chart5></chart5>
                </div>
                <div v-if="display6 == true">
                    <chart6></chart6>
                </div>
                <!--img src="..\assets\breadyard.jpg" loading="lazy" alt=""-->
            </div><br><br><br><br><br><br>
        </div>
        <div>
            <div class="container">
                <h4>View Visualisations of the total amount spent in the last 6 months (in SG$)</h4>
                <chart7></chart7>
            </div>
        </div>
    </div>
</body>  
</template>

<script>
import Chart1 from "./Eat1month.js";
import Chart2 from "./Eat3month.js";
import Chart3 from "./Eat6month.js";
import Chart4 from "./Sales1Month.js";
import Chart5 from "./Sales3Months.js";
import Chart6 from "./Sales6Months.js";
import Chart7 from "./TransactionTotal.js";
import fb from 'firebase';
export default {
    name: 'History',
    data() {
        return {
            display1 : true,
            display2 : false, 
            display3 : false,
            display4 : true,
            display5 : false, 
            display6 : false
        }
    },
    components: {
        chart1: Chart1,
        chart2: Chart2,
        chart3: Chart3,
        chart4: Chart4,
        chart5: Chart5,
        chart6: Chart6,
        chart7: Chart7
    },
    methods: {
        signOut(){
                fb.auth().signOut().then(() => {
                this.$router.replace('/')
            })
            .catch(err =>{
                this.error = err.message;
            })
        },

        MonthEat: function(x) {
            if (x == 1){
                this.display1 = true
                this.display2 = false
                this.display3 = false
            } else if (x == 3) {
                this.display1 = false
                this.display2 = true
                this.display3 = false                
            } else if (x == 6) {
                this.display1 = false
                this.display2 = false
                this.display3 = true                
            }
        },
        MonthSales: function(x) {
            if (x == 1){
                this.display4 = true
                this.display5 = false
                this.display6 = false
            } else if (x == 3) {
                this.display4 = false
                this.display5 = true
                this.display6 = false                
            } else if (x == 6) {
                this.display4 = false
                this.display5 = false
                this.display6 = true                
            }
        }    
    }
}

</script>

<style>
@import '../assets/basic_style.css';

.sort-font {
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 20px;
}

.SObutton {
    margin-left:10px;
    background-color:whitesmoke;
    font-size: 18px;
    border-radius: 12px;
    border: 2px solid #990000;
    width: 120px;
    font-family: sans-serif;
    padding-right: 15px;
}

</style>