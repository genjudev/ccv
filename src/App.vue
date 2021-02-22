<template>
  <div id="app">
    <Nav />
    <WatchedItems :items="$store.getters.getWatchedItems" :uri="uri + '/'" />
    <div style="margin-top: 60px"></div>

    <div class="main">
      <div style="max-width: 60%">
        <router-view></router-view>
      </div>
    </div>
    
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
  font-family: monospace;
}
</style>
<style scoped>
.main {
  display: flex;
  justify-content: center;
}
</style>
