<template>
  <body>
    <div
      data-collapse="medium"
      data-animation="default"
      data-duration="400"
      id="Navigation"
    >
      <div class="navigation-container">
        <div class="navigation-left">
          <img
            src="../assets/EateriesSG.png"
            loading="lazy"
            width="83"
            height="auto"
          />
          <div class="logo-text">EATERIES.SG</div>
        </div>
        <div class="navigation-right">
          <router-link to="/" exact>Home</router-link>
          <router-link to="/profile" exact>Profile</router-link>
          <router-link class="current" to="/partnereateries" exact
            >Partner Eateries</router-link
          >
          <router-link to="/currentbookings" exact
            >Current Bookings</router-link
          >
          <router-link to="/declaration" exact>Declaration</router-link>
        </div>
      </div>
    </div>
    <div id="Header" class="header">
      <div id="container-flex">
        <div class="head-content">
          <h1>Partner Eateries</h1>
          <p>
            Treat your taste buds and satisfy your cravings with our wide
            selection of partner eateries!
          </p>
        </div>
      </div>
    </div>
    <div>
      <h2>Bread Yard Menu</h2>
      <BreadYardMenu v-bind:itemsList="itemsList"></BreadYardMenu>
    </div>
  </body>
</template>

<script>
import BreadYardMenu from "../components/BreadYardMenu.vue";

export default {
  name: "BreadYard",
  components: {
    'BreadYardMenu': BreadYardMenu
  },
  data() {
    return {
      itemsList: [
        {
          id: "#000",
          name: "Beef Kofta Shakshuka",
          imageURL:
            "https://sethlui.com/wp-content/uploads/2020/10/bread-yard-5.jpg",
          price: 16.00,
        },
        {
          id: "#025",
          name: "Mushroom Bacon Truffle Alfredo",
          imageURL:
            "https://sethlui.com/wp-content/uploads/2020/10/bread-yard-2.jpg",
          price: 16.00,
        },
        {
          id: "#067",
          name: "Ham & Cheese Croissant",
          imageURL:
            "https://sethlui.com/wp-content/uploads/2020/10/bread-yard-4.jpg",
          price: 14.00,
        },
        {
          id: "#077",
          name: "Steak Sandwich",
          imageURL:
            "https://media-cdn.tripadvisor.com/media/photo-s/14/fb/c7/c3/grilled-sriracha-chicken.jpg",
          price: 14.00,
        },
        {
          id: "#099",
          name: "Lox & Bagel",
          imageURL:
            "https://d1sag4ddilekf6.cloudfront.net/compressed/items/SGITE20200315152818017140/photo/a54ca349fc1c4ea2b9a3796e86440507_1585210544930879702.jpeg",
          price: 14.00,
        },
        {
          id: "#200",
          name: "Pulled Pork Eggs Benedict",
          imageURL:
            "https://burpple-2.imgix.net/foods/2f08bcfa606fc66dc33e1848165_original.?w=645&dpr=1&fit=crop&q=80&auto=format",
          price: 14.00,
        },
        {
          id: "#001",
          name: "Bread Yard Big Breakfast",
          imageURL:
            "https://2.bp.blogspot.com/-qMkIsoXqPwM/WXUStpHwkhI/AAAAAAAAJZ4/rVihe-QUbBwEK09lskIYglmKT4rWIJ-qgCLcBGAs/s1600/Bread%2BYard%2BBig%2BBoy%2527s%2Bbreakfast%2Bsignature.jpg",
          price: 14.00,
        },
        {
          id: "#002",
          name: "Great Vegan Bowl",
          imageURL:
            "https://i.hungrygowhere.com/rnr/food/192085/7d630200/597a23f74136f076c0772ba67284ee0b_1567838199_800x0_crop_800x0_c765f542f1.jpg",
          price: 18.00,
        },
        {
          id: "#003",
          name: "Lychee Cruffin",
          imageURL:
            "https://rubbisheatrubbishgrow.files.wordpress.com/2020/08/lychee-cruffin-01-e1596533982551.jpg",
          price: 5.00,
        },
      ],
    };
  },
};
</script>

<style>
@import "../assets/basic_style.css";
</style>