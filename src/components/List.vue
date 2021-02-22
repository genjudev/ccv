<template>
  <div>
    <div v-if="!isValid">
      <input type="number" @keyup.enter="load" placeholder="PIN" />
    </div>
    <div v-else>
      <div>
        <ul>
          <h3>{{ this.data.listWithPin.shortId }}</h3>
          <li v-for="i in this.data.listWithPin.items" :key="i.id">
         {{ i.value }}
          </li>
        </ul>
      </div>
      <div>
        <input type="text" v-model="newString" placeholder="Add string" />
        <input
          :disabled="newString == null || newString.length < 1"
          type="button"
          @click="addItem"
          value="add"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isValid: false,
      pin: null,
      data: null,
      newString: null,
    };
  },
  watch: {
    '$route': 'init'
  },
  created() {
    this.pin = null;
    console.log("mout");
    this.shortId = this.$route.params.shortId;
  },
  methods: {
    init() {
      this.pin = null;
      this.isValid = false;
      this.shortId = this.$route.params.shortId;
    },
    load(e) {
      this.pin = e.target.value;
      var query = `query listWithPin($shortId: String!, $pin: String!) { listWithPin(shortId: $shortId, pin: $pin) { items, shortId }}`;
      fetch("https://api.ccv.ninja/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { shortId: this.shortId, pin: this.pin },
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          this.data = data.data;
          if (this.data) {
            this.isValid = true;
            this.$store.dispatch('addWatchedItem', this.data.listWithPin.shortId);
          }
        })
        .catch(console.log);
    },
    addItem() {
      var query = `
      mutation {
        addItem(shortId:"${this.data.listWithPin.shortId}",pin: "${this.pin}", item: "${this.newString}") { 
    
            items,
            shortId
        }
      }`;
      fetch("https://api.ccv.ninja/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ query }),
      })
        .then((r) => r.json())
        .then((data) => {
          this.data.listWithPin.items = data.data.addItem.items;
        })
        .catch(console.log);
    },
  },
};
</script>

<style>
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
}
</style>