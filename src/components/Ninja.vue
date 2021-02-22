<template>
  <div class="ninja">
    <div class="main">
      <div style="text-align:center">
      <h1>have an ID?</h1>
      </div>
      <div class="action">
        <div>
          <input type="text" @keyup.enter="form.id.length > 3 ? goTo() : null" v-model="form.id" placeholder="ID" autofocus />
        </div>
        <div>
          <input type="button" :disabled="form.id.length < 4" @click="goTo" value="Go" />
        </div>
      </div>
      <hr>
      <div class="action">
        <div style="text-align:center">
      <h1>create a new list</h1>
      </div>
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
        id: '',
        pin: "",
      },
    };
  },
  methods: {
    async goTo() {
      this.$router.push("/" + this.form.id);
    },
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
      
            this.$router.push({ name: "list", params: { shortId: this.data.shortId, pin: this.form.pin}});
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
  height: 50px;
  font-size: 32px;
}
.action input[type="text"] {
   height: 50px;
  width: 240px;
  font-size: 32px;
  text-align: center
}
hr { display: block; height: 1px;
    border: 0; border-top: 1px solid #ccc;
    margin: 1em 0; padding: 0; }
</style>
