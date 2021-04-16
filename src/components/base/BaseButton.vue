<template>
  <div>
    <button
      class="border-2 border-black bg-green-600 text-white p-2 rounded-md"
    >
      {{ msg }}
    </button>
  </div>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    msg: String,
  },
};
</script>

<style></style>
