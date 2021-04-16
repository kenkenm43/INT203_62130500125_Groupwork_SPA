<template>
  <div class="nav">
    <div class="text-white">
      <router-link to="/">Form</router-link>
      <router-link to="/info">Info</router-link>
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
  height: 50px;
}
a:link {
  text-decoration: none;
}
a:hover {
  background-color: yellowgreen;
}
a {
  background-color: green;
  padding: 10px;
  margin: 10px;
  border-radius: 2px;
}
</style>
