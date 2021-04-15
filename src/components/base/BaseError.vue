<template
  ><div>
    <div v-for="(er, name) in this.errors" :key="er">
      <div v-if="name.toUpperCase() == field.toUpperCase()">
        <div v-if="er === '' ? true : false" class="text-red-600">
          **** Please Enter Your {{ capitalize(field) }} ****
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "error",
  props: {
    errors: {
      type: Object,
      require: true,
    },
    field: {
      type: String,
      require: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    capitalize(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>

<style></style>
