<template>
<body>
    <!-- <div id="Banner" class="banner">
        <div class="banner-wrap">
            <div class="notice-text">Check out our promotions and don't forget to invite yourfriends for more perks!</div>
        </div>
    </div> -->
    <div data-collapse="medium" data-animation="default" data-duration="400" id="Navigation">
        <div class="navigation-container">
            <div class="navigation-left"><img src="../assets/EateriesSG.png" loading="lazy" width="83" height="auto">
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
        <input type="text" v-model="form.name" placeholder="Name"><br>
        <input type="text" v-model="form.phoneNo" placeholder="Phone Number"><br>
        <input type="email" v-model="form.email" placeholder="Email"><br>
        <input type="password" v-model="form.password" placeholder="Password"><br>
        <button type="submit" v-on:click="submit()">Sign-Up</button>
        </h2>
    </div>
    

</body>  
</template>

<script>
    import firebase from 'firebase';
    import database from '../firebase.js'
    export default {
        data(){
            return{
                form:{
                    name:"Enter Name Here",
                    email:"email here",
                    password:"password here",
                    phoneNo:"",
                }
            }
        },
        methods:{
            submit(){
                firebase
                .auth()
                .createUserWithEmailAndPassword(this.form.email, this.form.password)
                .then( res => {
                    res.user.updateProfile({
                        displayName: this.form.name
                    })

                    .then(
                        database.collection('Users').doc(res.user.uid)
                        .set({
                            name: this.form.name,
                            email:this.form.email,
                            password: this.form.password,
                            phoneNumber:this.form.phoneNumber
                        })
                        .then(function(){
                            console.log("Succesfully created!")
                        })
                        .catch(err =>{
                            this.error = err.message;
                        })
                    )
                })
                .catch(err => {
                this.error = err.message;
                });
            }
        }
    }
</script>

<style>
@import '../assets/basic_style.css';

</style>