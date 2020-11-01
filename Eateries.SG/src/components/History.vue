<template>
<body>
    <div data-collapse="medium" data-animation="default" data-duration="400" id="Navigation">
        <div class="navigation-container">
            <div class="navigation-left"><img src="../assets/EateriesSG.png" loading="lazy" width="83" height="auto">
                <div class="logo-text">EATERIES.SG</div>
            </div>
            <div class="navigation-right">
                <router-link class = "link" to="/" exact>Home</router-link>
                <router-link class = "link" to="/profile" exact>Profile</router-link>
                <router-link class = "current" to="/history" exact>History</router-link>
                <router-link class = "link" to="/partnereateries" exact>Partner Eateries</router-link>
                <router-link class = "link" to="/currentbookings" exact>Current Bookings</router-link>
                <router-link class = "link" to="/declaration" exact>Declaration</router-link>
            </div>
        </div>
    </div>
    <div id="Header" class="header">
        <div id="container-flex">
            <div class="head-content">
                <h1>History</h1>
                <p>Travel back in time!</p>
            </div>
        </div>
    </div>
    <div class="content-section">
        <div>
            <p>Display a chart of your choice by clicking on any of the following buttons</p>
        </div>
        <div class="sort-by-buttons w-container">
            <p>Plots of the past eateries visited</p>
            <div>
                <button class="button" v-on:click="MonthEat(1)">Last 1 Month</button>
                <button class="button" v-on:click="MonthEat(3)">Last 3 Months</button>
                <button class="button" v-on:click="MonthEat(6)">Last 6 months</button>
            </div>
            <div>
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
        <div class="sort-by-buttons w-container">
            <p>Plots of the past transactions (in SG$)</p>
            <div>
                <button class="button">Last 1 Month</button>
                <button class="button">Last 3 Months</button>
                <button class="button">Last 6 months</button>
            </div>
            <div>
                <img src="..\assets\breadyard.jpg" loading="lazy" alt="">
            </div>
        </div>
    </div>
</body>  
</template>

<script>
import Chart1 from "./Eat1month.js";
import Chart2 from "./Eat3month.js";
import Chart3 from "./Eat6month.js";

export default {
    name: 'History',
    data() {
        return {
            display1 : true,
            display2 : false, 
            display3 : false
        }
    },
    components: {
        chart1: Chart1,
        chart2: Chart2,
        chart3: Chart3
    },
    methods: {
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
        }    
    }
}

</script>

<style>
@import '../assets/basic_style.css';


</style>