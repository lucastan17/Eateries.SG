<template>
<body>
    <div id="Navigation">
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
                <h4>Create a new account here!</h4>
            </div>
        </div>
    </div>
    <div>
        <h2>Are you excited to create your brand new account?</h2>
        <h4>Fill in the 4 fields below to get started!</h4><br><br>
    </div>
    <div>
        <h5><a style ="padding:75px;">Name:</a><input type="text" v-model="name" placeholder="Enter Name Here"></h5>
        <h5><a style ="padding:25px;">Phone Number:</a><input type="text" v-model="phoneNo" placeholder="Enter Phone Number Here"></h5>
        <h5><a style ="padding:77px;">Email:</a><input type="text" v-model="email" placeholder="Enter Email Here"></h5>
        <h5><a style ="padding:55px;">Password:</a><input type="password" v-model="password" placeholder="Enter Password Here"></h5><br>
        <button type="submit" @click="submit()" id="signupButton">Sign-Up</button><br><br>
    </div>
    

</body>  
</template>

<script>
    import fb from 'firebase';
    import database from '../firebase.js'
    export default {
        data(){
            return{
                name:"",
                email:"",
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

#signupButton {
    margin-left:10px;
    background-color:whitesmoke;
    font-size: 16px;
    border-radius: 12px;
    border: 2px solid #990000;
    width: 120px;
    font-family: sans-serif;
    padding-right: 15px;
}

</style>