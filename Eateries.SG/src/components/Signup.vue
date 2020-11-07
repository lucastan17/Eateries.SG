<template>
<body>
    <!-- <div id="Banner" class="banner">
        <div class="banner-wrap">
            <div class="notice-text">Check out our promotions and don't forget to invite yourfriends for more perks!</div>
        </div>
    </div> -->
    <div data-collapse="medium" data-animation="default" data-duration="400" id="Navigation">
        <div class="navigation-container">
            <div class="navigation-left"><img src="..\assets\EateriesSG.svg" loading="lazy" width="83" height="auto">
                <div class="logo-text">EATERIES.SG</div>
            </div>
            <div class="navigation-right">
                <router-link class ="link" to="/" exact>Log-In</router-link>
                <router-link class = "current" to="/signup" exact>Sign-Up</router-link>
            </div>
        </div>
    </div>
    <div id="Header" class="header">
        <div id="container-flex">
            <div class="head-content">
                <h1>Sign-Up</h1>
                <p>Create a new account here!</p>
            </div>
        </div>
    </div>
    <div>
        <h2>
        <input type="text" v-model="name" placeholder="Name"><br>
        <input type="text" v-model="phoneNo" placeholder="Phone Number"><br>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button type="submit" @click="submit()">Sign-Up</button>
        </h2>
    </div>
    

</body>  
</template>

<script>
    import fb from 'firebase';
    import database from '../firebase.js'
    export default {
        data(){
            return{
                name:"Enter Name Here",
                email:"email here",
                password:"",
                phoneNo:"",
            }
        },
        methods:{
            submit(){
                fb
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then( res => {
                    res.user.updateProfile({
                        displayName: this.name
                    })
                    .then(
                        database.collection('Users').doc(res.user.uid)
                        .set({
                            name: this.name,
                            email:this.email,
                            password: this.password,
                            phoneNumber:this.phoneNo,
                    })
                    .then(function(){
                        alert("Successfully created!")
                        //console.log("Document successfully written")
                    },
                    err => {this.error = err.message; alert(this.error)})
                    , err => {this.error = err.message; alert(this.error)})
                }, err => {this.error = err.message; alert(this.error)});
                this.$router.push("/")   
            },
        },
        
    }
</script>

<style>
@import '../assets/basic_style.css';

</style>