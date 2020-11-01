<template>
<body>
    <div data-collapse="medium" data-animation="default" data-duration="400" id="Navigation">
        <div class="navigation-container">
            <div class="navigation-left"><img src="../assets/EateriesSG.png" loading="lazy" width="83" height="auto">
                <div class="logo-text">EATERIES.SG</div>
            </div>
            <div class="navigation-right">
                <router-link to="/" exact>Home</router-link>
                <router-link to="/profile" exact>Profile</router-link>
                <router-link to="/history" exact>History</router-link>
                <router-link to="/partnereateries" exact>Partner Eateries</router-link>
                <router-link class = "current" to="/currentbookings" exact>Current Bookings</router-link>
                <router-link to="/declaration" exact>Declaration</router-link>
            </div>
        </div>
    </div>
    <div id="Header" class="header">
        <div id="container-flex">
            <div class="head-content">
                <h1>Current Bookings</h1>
                <p>Testing! Current Bookings displayed here</p>
            </div>
        </div>
    </div>

    <table>
        <thead><samp></samp>
            <tr>
                <th>Eatery</th>
                <th>Name</th>
                <th>Pax</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="booking in bookings" :key = "booking">
                <td>{{booking.Eatery}}</td>
                <td>{{booking.Name}}</td>
                <td>{{booking.Pax}}</td>
                <td>{{booking.Time.toDate()}}</td>
            </tr>
        </tbody>
    </table>

</body>  
</template>

<script>
    import db from '../firebase.js'
    export default {
        name: 'CurrentBookings',
        data(){
            return{
                bookings:[]
            }
        },  
        methods:{
            readData(){
                db.collection("bookings").get().then((querySnapshot) =>{
                querySnapshot.forEach((doc)=>{
                    this.bookings.push(doc.data());
                })
            })
            },
        },
        created(){
            this.readData();
        }
    }

</script>

<style>
@import '../assets/basic_style.css';

</style>