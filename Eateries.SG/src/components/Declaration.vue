<template>
<body>
    <div id="Navigation">
        <div class="navigation-container">
            <div class="navigation-left"><img src="..\assets\EateriesSG.svg" loading="lazy" width="83" height="auto">
                <div class="logo-text">EATERIES.SG</div>
            </div>
            <div class="navigation-right">
                <router-link class = "link" to="/home" exact>Home</router-link>
                <router-link class = "link" to="/profile" exact>Profile</router-link>
                <router-link class = "link" to="/history" exact>History</router-link>
                <router-link class = "link" to="/partnereateries" exact>Partner Eateries</router-link>
                <router-link class = "link" to="/currentbookings" exact>Current Bookings</router-link>
                <router-link class = "current" to="/declaration" exact>Declaration</router-link>
                <button class="SObutton" @click ="signOut()"><img src="..\assets\logout.svg" style="width:24px; height:22px; float:left">Logout</button>
            </div>
        </div>
    </div>
    <div id="Header" class="header">
        <div id="container-flex">
            <div class="head-content">
                <h1>Declaration</h1>
                <h4>Do your part to make it a safer place for all</h4>
            </div>
        </div>
    </div>
    <div id='dec'>
        <h3>Complete before entering the Eatery</h3>
        <div class="container">
            <form id="temperature-form">
                <label for="temp">Current Temperature: (Format required: XX.X)</label>
                <br>
                <input type="text" class="w-input" v-model.lazy="content.temp">
                <br>
                <label for="symptoms">Do you have any COVID-19 symptoms that you recently acquired?:</label>
                <br>
                <select class="w-input" v-model.lazy="content.q1">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <br>
                <label for="family">Do you have anyone in the same household having fever, and/or showing the any symptoms of COVID-19?</label>
                <br>
                <select class="w-input" v-model.lazy="content.q2">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <br>
                <button class="button" v-on:click.prevent="checkValidity()">Submit</button>
            </form>
            <div class="buttonPadding">
                <button class="button" id="showTemp" v-on:click.prevent="loadTemps()">Load Declaration Records</button>
            </div>
        </div>
    </div>
    <div v-if="this.show === true">
        <h3>Past declaration records</h3>
        <table>
            <thead><samp></samp>
                <tr>
                    <th>Temperature</th>
                    <th>Response to Question 2</th>
                    <th>Response to Question 3</th>
                    <th>Time stamp</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="entry in entries" :key = "entry">
                    <td>{{entry.temp + "°C"}}</td>
                    <td>{{entry.q1}}</td>
                    <td>{{entry.q2}}</td>
                    <td>{{new Date(entry.time).getDate() + " " + new Date(entry.time).toLocaleString("en-US", {month: "long"}) + " " +
                         new Date(entry.time).getHours() + ":" +  new Date(entry.time).getMinutes()}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</body>  
</template>

<script>
import database from '../firebase.js'
import fb from 'firebase';
    export default {
        name: 'Declaration',
        
        data() {
            return {
                entries: [],
                content : {
                    temp: 36.7,
                    q1: "",
                    q2: "",
                    time: ""
                },
                show: false,           
            }
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
            loadTemps: function() {
                this.entries = [];
                database.collection('Users').doc(fb.auth().currentUser.uid).collection('temperature').orderBy("time", "desc").get().then(snapshot => {
                    snapshot.forEach(doc => {
                        this.entries.push(doc.data());
                    });
                });
                this.entries = this.entries.reverse();
                this.show = !this.show;
                if (this.show) {
                    document.getElementById("showTemp").innerHTML = "Hide Declaration Records";
                } else {
                    document.getElementById("showTemp").innerHTML = "Load Declaration Records";
                }
            },

            saveTemps: function() {
                this.content.time = new Date().getTime();
                database.collection('Users').doc(fb.auth().currentUser.uid).collection('temperature').add(this.content);
                this.content.temp = 36.7;
                this.content.q1 = "";
                this.content.q2 = "";
                this.content.time = "";
                this.entries = [];
                database.collection('Users').doc(fb.auth().currentUser.uid).collection('temperature').orderBy("time", "desc").get().then(snapshot => {
                    snapshot.forEach(doc => {
                        this.entries.push(doc.data());
                    });
                });
            },

            checkValidity: function() {
                if (this.content.temp > 40 || this.content.temp < 34) {
                    alert("Invalid Temperature Added! Please Try Again");
                } else {
                    if (this.content.q1 == "" || this.content.q2 == "") {
                        alert("Invalid Response to Questions 2 or 3. Please Try Again");
                    } else {
                        this.saveTemps();
                        alert("Declaration is Successful!")
                    }
                }
            }

        },
    }


</script>

<style>
@import '../assets/basic_style.css';

label {
    text-align: left;
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    font-family: Inter, sans-serif;
    color: #333;
    font-size: 15px;
    
}

.w-input {
    display: block;
    width: 100%;
    height: 38px;
    padding: 8px 12px;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 1.428571429;
    color: #333333;
    vertical-align: middle;
    background-color: #ffffff;
    border: 1px solid #cccccc;
}

#dec {
    margin: 30px;
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

.buttonPadding {
    padding-top: 20px;
}

</style>    