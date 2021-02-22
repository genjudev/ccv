<template>
  <div class="ninja">
    <div class="main">
      <div class="action">
        <div>
          <input type="number" @keyup.enter="form.pin.length > 3 ? load() : null" v-model="form.pin" placeholder="PIN" autofocus />
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
      fetch("https://api.ccv.ninja/graphql", {
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
          if (this.data) {
            this.isValid = true;
      
            window.location.href = '/' + this.data.shortId
          }
          this.form.pin = '';
        })
        .catch(console.log);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.action {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.action div {
  text-align: center;
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
.action input[type="text"] {
  border: 1px solid black;
 height: 25px;
  min-width: 180px;
  font-size: 18px;
}
</style>
