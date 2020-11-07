<template>
  <body>
    <div class="footer">
      <div class="container">
        <div class="w-layout-grid footer-grid">
          <div class="footer-column">
            <p>Bringing you closer to your favourite restaurants, both new and old.</p>
            <div class="navigation-left">
              <img src="..\assets\EateriesSG.svg" loading="lazy" width="83" alt="" />
              <div class="logo-text">EATERIES.SG</div>
            </div>
          </div>
          <div class="footer-column">
            <div class="title">company</div>
            <router-link class="footer-link" to="/aboutus" exact>About Us</router-link>
            <router-link class="footer-link" to="/faq" exact>FAQ</router-link>
            <router-link class="footer-link" to="/contactus" exact>Contact Us</router-link>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<style>
@import "../assets/basic_style.css";
</style>