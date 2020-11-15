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
                <router-link class ="current" to="/" exact>Log-In</router-link>
                <router-link class = "link" to="/signup" exact>Sign-Up</router-link>
            </div>
        </div>
    </div>
    <div id="Header" class="header">
        <div id="container-flex">
            <div class="head-content">
                <h1>Log-In</h1>
                <h4>Log-In here, or sign-up if you are a new user!</h4>
            </div>
        </div>
    </div>
    <div>
        <h2>Welcome to Eateries.SG!</h2>
        <h4>Sign in with your email and password</h4>
        <br>
        <div class ="content-section">
            <h5><a style ="padding:25px;">Email:</a> <input type="text" v-model="email" placeholder="Enter your email here"></h5><p></p>
            <h5><a style ="padding:5px;">Password:</a> <input type="password" v-model="password" placeholder="Enter your password here"></h5>
            <br>
            <button @click ="login()" id="loginButton">Log-In</button>
        <!--
            <p>No account? Sign up for an account!</p>
        -->
        <p></p>
            <router-link class = "link" to="/signup" exact>No account? Click here to Sign Up!</router-link>
        </div>
        <br><br><br><br>
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
                    alert(this.error);
                })
            }    
        }
    }
</script>

<style>
@import '../assets/basic_style.css';

#loginButton {
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