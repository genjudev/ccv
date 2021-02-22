<template>
  <div>
    <nav>
      <ul>
        <li>
          <router-link to="/">
            <font-awesome-icon icon="user-ninja"></font-awesome-icon>&nbsp;Copy Paste
            Ninja  &lt;C-c&gt;&lt;C-v&gt;</router-link
          >
        </li>
        <li></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
nav {
  width: 100%;
  background-color: lightblue;
  height: 20px;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
li {
  display: inline;

  padding: 12px;
}
li a {
  text-decoration: none;
  color: black;
  font-size: 18px;
}
</style>