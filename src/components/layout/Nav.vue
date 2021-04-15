<template>
  <div class="nav">
    <div class="text-white">
      <router-link to="/">Home</router-link> |
      <router-link to="/form">Form</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  props: {},
};
</script>

<style scoped>
.nav {
  background-color: black;
}
a:link {
  text-decoration: none;
}
</style>
