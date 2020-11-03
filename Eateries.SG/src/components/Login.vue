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
                <router-link class ="current" to="/login" exact>Log-In</router-link>
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
        <input type="text" placeholder="Email"><br>
        <input type="password" placeholder="Password"><br>
        <button>Log-In</button>
        <p>No account? Sign up for an account!</p>
    </div>
    

</body>  
</template>

<script>
    
</script>

<style>
@import '../assets/basic_style.css';

</style>