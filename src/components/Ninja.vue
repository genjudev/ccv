<template>
  <div class="ninja">
    <div class="main">
      <h1>Copy & Paste Ninja &lt;C-c&gt;&lt;C-v&gt;</h1>
      <div class="action">
        <div>
          <input type="number" v-model="form.pin" />
        </div>
        <div>
          <input type="button" :disabled="form.pin.length < 4" @click="load" value="Create List" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ninja",
  data() {
    return {
      data: null,
      form: {
        pin: "",
      },
    };
  },
  methods: {
    async createListAndRedirect() {},
    load() {
      var query = `
      mutation {
        createList(input: { data: { pin: "${this.form.pin}"}}) { 
          list {
            shortId
          }
        }
      }`;
      fetch("http://localhost:1337/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({query}),
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
          this.data = data.data.createList.list;
          console.log(this.data);
          if (this.data) {
            this.isValid = true;
      
            window.location.href = '/' + this.data.shortId
          }
        })
        .catch(console.log);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.action {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
.action input {
  margin: 10px;
}
.action input[type=number] {
  height: 50px;
  width: 240px;
  font-size: 32px;
  text-align: center
}
.action input[type="button"] {
  background-color: lightblue;
  border: 1px solid black;
  width: 240px;
  height: 80px;
  font-size: 32px;
}
</style>
