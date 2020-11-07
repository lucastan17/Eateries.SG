<template>
<body>
    <div data-collapse="medium" data-animation="default" data-duration="400" id="Navigation">
        <div class="navigation-container">
            <div class="navigation-left"><img src="..\assets\EateriesSG.svg" loading="lazy" width="83" height="auto">
                <div class="logo-text">EATERIES.SG</div>
            </div>
            <div class="navigation-right">
                <router-link class = "current" to="/home" exact>Home</router-link>
                <router-link class = "link" to="/profile" exact>Profile</router-link>
                <router-link class = "link" to="/history" exact>History</router-link>
                <router-link class = "link" to="/partnereateries" exact>Partner Eateries</router-link>
                <router-link class = "link" to="/currentbookings" exact>Current Bookings</router-link>
                <router-link class = "link" to="/declaration" exact>Declaration</router-link>
                <button @click ="signOut()">Sign Out</button>
            </div>
        </div>
    </div>
    <div id="Header" class="header">
        <div id="container-flex">
            <div class="head-content">
                <h1>Home</h1>
                <p>One small step for your finger, a giant step for your stomach</p>
            </div>
        </div>
    </div>
    <div id="Home-container">
        <h2>Welcome! What would you like to do today?</h2>
        <div class="buttons-flex">
           <div class="button-cover">
                <button class="homebtn" @click="$router.push('profile')"><img src="..\assets\profile.svg" width="150" height="150"><br>Profile</button>
            </div>
            <div class="button-cover">
                <button class="homebtn" @click="$router.push('history')"><img src="..\assets\history.svg" width="150" height="150"><br>History</button>
            </div>
            <div class="button-cover">
                <button class="homebtn" @click="$router.push('partnereateries')"><img src="..\assets\partner.svg" width="150" height="150"><br>Partner Eateries</button>
            </div>
        </div>
        <div class="buttons-flex">
            <div class="button-cover">
                <button class="homebtn" @click="$router.push('currentbookings')"><img src="..\assets\curbook.svg" width="150" height="150"><br>Current Bookings</button>
            </div>
            <div class="button-cover">
                <button class="homebtn" @click="$router.push('declaration')"><img src="..\assets\sick.svg" width="150" height="150"><br>Declaration</button>
            </div>
            <div class="button-cover">
                <button class="homebtn" @click="signOut()"><img src="..\assets\logout.svg" width="150" height="150"><br>Logout</button>
            </div> 
        </div>
    </div>
    

</body>  
</template>

<script>
import fb from 'firebase';
export default {
    name: 'Home',
    components:{
    },
    methods:{
        signOut(){
                fb.auth().signOut().then(() => {
                this.$router.replace('/')
            })
            .catch(err =>{
                this.error = err.message;
            })
        }
    }
}    

</script>

<style>
@import '../assets/basic_style.css';
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Montserrat:wght@100;200;400&display=swap');

.buttons-flex {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-between;
    justify-content: space-between;
}
.button-cover {
    margin: 15px;
}

.homebtn {
    display:inline-block;
    width: 200px;
    height: 200px;
    padding:5px 10px;
    border-radius: 10px;
    background-color: #b1b2d8;
    font-size: 20px;
}

#Home-container {
    margin: auto;
    width: 70%;
}

</style>