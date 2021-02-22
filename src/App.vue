<template>
  <div id="app">
    <Nav />
    <div style="margin-top:60px;"></div>
    <div class="main">
      <router-view></router-view>
    </div>
    <WatchedItems :items="$store.getters.getWatchedItems" :uri="uri + '/'" />
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import WatchedItems from "@/components/WatchedItems";
export default {
  name: "App",
  components: {
    Nav,
    WatchedItems,
  },
  data() {
    return {
      uri: location.origin,
    };
  },
};
</script>

<style>
body {
  margin: 0;
}
</style>
<style scoped>
.main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
