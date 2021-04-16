<template>
  <div class="form">
    <div class="container">
      <base-view>
        <div class="container topic heading">
          <p>Form Infomation</p>
        </div>
        <form @submit.prevent="submitForm()">
          <div class="input-group">
            <label for="firstName">FirstName</label>

            <input id="firstName" type="text" v-model.trim="form.firstName" />
            <base-error :errors="errors" field="firstname"></base-error>
          </div>
          <div class="input-group">
            <label for="lastName">LastName</label>
            <input id="lastName" type="text" v-model.trim="form.lastName" />
            <base-error :errors="errors" field="lastname"></base-error>
          </div>
          <div class="input-group">
            <label for="message">Message</label>
            <textarea
              id="message"
              rows="4"
              cols="50"
              v-model.trim="form.message"
              placeholder="Please Enter Your Message ...."
            ></textarea>
            <base-error :errors="errors" field="message"></base-error>
          </div>
          <base-error></base-error
          ><base-button msg="Submit"></base-button></form
      ></base-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "form",
  components: {},
  data() {
    return {
      form: { firstName: "", lastName: "", message: "" },
      errors: null,
      url: "http://localhost:5000/formInfo",
      formResult: [],
      count: "",
    };
  },
  methods: {
    submitForm() {
      this.errors = this.form;
      // console.log(this.errors);
      console.log(this.form);
      // console.log(this.invalidNameInput);
      if (
        this.form.firstName !== "" &&
        this.form.lastName !== "" &&
        this.form.message !== ""
      ) {
        this.addNewInfo({
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          message: this.form.message,
        });
        alert("Submit Success!!!");
        this.form.firstName = null;
        this.form.lastName = null;
        this.form.message = null;
      }
    },
    async addNewInfo(newInfo) {
      try {
        const res = await fetch(this.url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            firstName: newInfo.firstName,
            lastName: newInfo.lastName,
            message: newInfo.message,
          }),
        });
        const data = await res.json();
        this.formResult = [...this.formResult, data];
      } catch (error) {
        console.log(`Colud not save! ${error}`);
      }
    },
  },
};
</script>
<style scoped>
.input-group label {
  display: block;
  text-align: left;
  margin: 3px;
}
.input-group input {
  height: 30px;
  width: 93%;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid gray;
}
.input-group textarea {
  font-size: 16px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  resize: none;
}
</style>
