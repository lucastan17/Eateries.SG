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
                <router-link class ="link" to="/login" exact>Log-In</router-link>
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
        <input type="text" placeholder="Name"><br>
        <input type="text" placeholder="Phone Number"><br>
        <input type="text" placeholder="Company"><br>
        <input type="text" placeholder="Email"><br>
        <input type="password" placeholder="Password"><br>
        <button>Sign-Up</button>
        </h2>
    </div>
    

</body>  
</template>

<script>
    
</script>

<style>
@import '../assets/basic_style.css';

</style>