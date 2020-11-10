<template>
<body>
    <div data-collapse="medium" data-animation="default" data-duration="400" id="Navigation">
        <div class="navigation-container">
            <div class="navigation-left"><img src="..\assets\EateriesSG.svg" loading="lazy" width="83" height="auto">
                <div class="logo-text">EATERIES.SG</div>
            </div>
            <div class="navigation-right" v-if="signedIn()">
                <router-link class = "link" to="/home" exact>Home</router-link>
                <router-link class = "link" to="/profile" exact>Profile</router-link>
                <router-link class = "link" to="/history" exact>History</router-link>
                <router-link class = "link" to="/partnereateries" exact>Partner Eateries</router-link>
                <router-link class = "link" to="/currentbookings" exact>Current Bookings</router-link>
                <router-link class = "link" to="/declaration" exact>Declaration</router-link>
                <button class="SObutton" @click ="signOut()"><img src="..\assets\logout.svg" style="width:24px; height:22px; float:left">Logout</button>
            </div>
            <div class="navigation-right" v-else>
                <router-link class ="current" to="/" exact>Log-In</router-link>
                <router-link class = "link" to="/signup" exact>Sign-Up</router-link>
            </div>
            
        </div>
    </div>
    <div id="Header" class="header">
        <div id="container-flex">
            <div class="head-content">
                <h1>Frequently Asked Questions</h1>
            </div>
        </div>
    </div>
    <div class="content-section">
    <div class="container">
        <div class="w-layout-grid content-grid">
        <div class="content-block">
          
        </div>
        </div>
    </div>
    </div>

</body>
</template>

<script>
    import fb from 'firebase'
    export default{
        methods:{
            signOut(){
                fb.auth().signOut().then(() => {
                    this.$router.replace('/')
                })
                .catch(err =>{
                    this.error = err.message;
                })
            },
            
            signedIn(){
                return fb.auth().currentUser != null
            }
        }
    }   
    
</script>

<style>
@import "../assets/basic_style.css";
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