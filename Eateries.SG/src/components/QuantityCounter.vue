<template>
  <div id="app">
    <button v-on:click="decrement" style="background-color:#f0bcbc">-</button>
    {{ counter }}
    <button v-on:click="increment" style="background-color:#f0bcbc">+</button>
  </div>
</template>

<script>
export default {
  props: {
    item: {},
  },
  data() {
    return {
      counter: 0
    };
  },
  methods: {
    increment: function () {
      this.counter++;
      this.$emit("counter", this.item, this.counter);
    },
    decrement: function () {
      if (this.counter > 0) {
        this.counter--;
      }
      this.$emit("counter", this.item, this.counter);
    },
  },
};
</script>

<style scoped>
button {
  display: inline-block;
  padding: 0.3em 1.2em;
  margin: 0 0.1em 0.1em 0;
  box-sizing: border-box;
  text-decoration: none;
  border: 0.16em solid rgba(255, 255, 255, 0);
  border-radius: 2em;
  font-family: Roboto, sans-serif;
  font-weight: 300;
  color: #000;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  text-align: center;
}
button:hover {
  border-color: rgba(255, 255, 255, 1);
}
@media all and (max-width: 30em) {
  button {
    display: block;
    margin: 0.2em auto;
  }
}
</style>