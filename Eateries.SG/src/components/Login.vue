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
                <router-link class ="current" to="/" exact>Log-In</router-link>
                <router-link class = "link" to="/signup" exact>Sign-Up</router-link>
            </div>
        </div>
    </div>
    <div id="Header" class="header">
        <div id="container-flex">
            <div class="head-content">
                <h1>Log-In</h1>
                <p>Log-In Here, or sign-up if you are a new user!</p>
            </div>
        </div>
    </div>
    <div>
        <h2></h2>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button @click ="login()" >Log-In</button>
        <!--
            <p>No account? Sign up for an account!</p>
        -->
        <p></p>
        <router-link class = "link" to="/signup" exact>No account? Click here to Sign Up!</router-link>
    </div>
    

</body>  
</template>

<script>
    import fb from 'firebase';
    export default{
        data(){
            return{
                email:'',
                password:'',
            }
        },
        methods:{
            login(){
                if(this.email == '' || this.password =='') {
                    alert('Enter details to Sign in!')
                }
                fb.auth().signInWithEmailAndPassword(this.email,this.password)
                .then(() =>{
                    this.$router.replace("/home")  
                }).then(()=>{
                    this.email = ""
                    this.password = ""
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

</style>