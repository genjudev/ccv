<template>
  <div>
    <div class="main">
      <div class="badge" v-for="i in items" :key="i">
        <router-link :to="i"> {{ i }} </router-link><input type="button" @click="rem(i)" value="X" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    uri: {
        type: String,
        required: true
    }
  },
  methods: {
    rem(shortId) {
      this.$store.dispatch("remWatchedItem", shortId);
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  bottom: 0;
  position: absolute;
}
.main .badge {
  margin: 5px;
}
.badge {
  background-color: lightgrey;
  padding: 5px;
}
</style>