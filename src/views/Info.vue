<template>
  <div>
    <table id="show">
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Message</th>
        <th>Edit / Delete</th>
      </tr>
      <tr v-for="(data, index) in this.database" :key="data.id">
        <td v-if="isEdit[index]">{{ data.firstName }}</td>
        <td v-else>
          <input
            v-model.trim="data.firstName"
            :placeholder="data.firstName"
            :class="{ 'bg-red-50': invalidate }"
            @blur="validate(data.firstName)"
          />
          <base-error :errors="data" field="firstname"></base-error>
        </td>
        <td v-if="isEdit[index]">{{ data.lastName }}</td>
        <td v-else>
          <input v-model.trim="data.lastName" :placeholder="data.lastName" />
          <base-error :errors="data" field="lastname"></base-error>
        </td>
        <td v-if="isEdit[index]">{{ data.message }}</td>
        <td v-else>
          <textarea v-model.trim="data.message" :placeholder="data.message" />
          <base-error :errors="data" field="message"></base-error>
        </td>
        <td>
          <button
            v-if="isEdit[index]"
            @click="showData(index)"
            class="bg-green-500 m-1"
          >
            <img src="@/assets/edit.svg" alt="" />
          </button>
          <button v-else>
            <img @click="submut(data, index)" src="@/assets/check.svg" />
          </button>
          <button @click="deleted(data.id)" class="bg-red-500 m-1">
            <img src="@/assets/delete.svg" alt="" />
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "info",
  data() {
    return {
      database: [],
      url: "http://localhost:5000/formInfo",
      isEdit: [],
      editId: "",
      editData: { firstName: "", lastName: "", message: "" },
    };
  },
  methods: {
    showData(index) {
      this.isEdit[index] = false;
    },
    trueDo() {
      for (let i = 0; i < this.database.length; i++) {
        this.isEdit[i] = true;
      }
    },
    submut(value, index) {
      console.log(value.id);
      console.log(value.firstName);
      console.log(value.lastName);
      if (
        value.firstName !== "" &&
        value.lastName !== "" &&
        value.message !== ""
      ) {
        let z = confirm("Do you want EDIT?");
        if (z == true) {
          this.edit({
            id: value.id,
            firstName: value.firstName,
            lastName: value.lastName,
            message: value.message,
            in: index,
          });
        }
      } else {
        alert("Please Enter Your Info");
      }
    },
    async edit(editing) {
      try {
        const res = await fetch(`${this.url}/${editing.id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            firstName: editing.firstName,
            lastName: editing.lastName,
            message: editing.message,
          }),
        });
        const data = await res.json();
        this.database = this.database.map((db) =>
          db.id === editing.id
            ? {
                ...db,
                firstName: data.firstName,
                lastName: data.lastName,
                message: data.message,
              }
            : db
        );
        alert("Edit Success");
        this.isEdit[editing.in] = true;
      } catch (error) {
        console.log(`Could not edit! ${error}`);
      }
    },
    async deleted(deleteId) {
      let a = confirm("Do you want to DELETE?");
      if (a == true) {
        try {
          await fetch(`${this.url}/${deleteId}`, {
            method: "DELETE",
          });
          //filter - higher order function
          this.database = this.database.filter((db) => db.id !== deleteId);
          alert(`DELETE SUCCESS`);
        } catch (error) {
          console.log(`Could not delete! ${error}`);
        }
      }
    },
    async getInfoResult() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(`Colud not get! ${error}`);
      }
    },
  },
  async created() {
    this.database = await this.getInfoResult();
    this.trueDo();
  },
};
</script>

<style>
#show {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#show td,
#show th {
  border: 1px solid #ddd;
  padding: 8px;
}
.bd {
  border: 1px solid #ddd;
  padding: 8px;
}
#show tr:nth-child(even) {
  background-color: #f2f2f2;
}

#show tr:hover {
  background-color: #ddd;
}

#show th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #4caf50;
  color: white;
}
input {
  height: 30px;
  width: 93%;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid gray;
}
textarea {
  width: 93%;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid gray;
}
</style>
