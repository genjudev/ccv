<template>
  <div>
    <div v-if="!isValid">
      <div class="action">
        <div>
          <input
            type="number"
            @keyup.enter="load"
            v-model="pin"
            placeholder="PIN"
            autofocus
          />
        </div>
        <div>
          <input type="button" @click="load" value="Enter" />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="content">
        <h3>{{ this.data.listWithPin.shortId }}</h3>
        <div
          v-for="i in this.data.listWithPin.items"
          :key="i.id"
          class="listRow"
        >
          <div class="list">
            <span>{{ i.value }}</span>
          </div>
        </div>
      </div>
      <div>
        <p v-if="error" style="color: red">{{ error }}</p>
        <div class="action">
          <div class="grid">
            <div v-if="newString.length < 24">
              <input
                type="text"
                v-model="newString"
                @keyup.enter="addItem"
                placeholder="abc..."
                ref="entryText"
                autofocus
              />
            </div>
            <div v-else>
              <textarea
                class="textArea"
                ref="entryText"
                v-model="newString"
                autofocus
              >
              </textarea>
            </div>
            <div class="grid-row">
              <input
                class="btnAddMsg"
                :disabled="newString == null || newString.length < 1"
                type="button"
                @click="addItem"
                value="add"
              />
              <span class="badge">{{ newString.length }} / 512</span>
            </div>
          </div>
        </div>
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
      newString: "",
      error: null,
      copiedToClip: false,
    };
  },
  watch: {
    $route: "init",
    newString: function () {
      this.$nextTick(() => {
        this.$refs.entryText.focus();
      });
    },
  },
  computed: {
    cpModal: () => document.getElementById("cbModal"),
  },
  mounted() {
    this.pin = null;
    this.shortId = this.$route.params.shortId;
  },
  methods: {
    init() {
      this.pin = null;
      this.isValid = false;
      this.shortId = this.$route.params.shortId;
    },
    saveToClipboard(v) {
      /* Get the text field */
      var e = document.createElement("INPUT");
      e.setAttribute("value", v);

      /* Select the text field */
      e.select();
      e.setSelectionRange(0, 99999); /* For mobile devices */

      /* Copy the text inside the text field */
      document.execCommand("copy");

      this.cpModal.style.display = "block";
    },
    detectMob() {
      const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
      ];

      return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
      });
    },
    load() {
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
            this.$store.dispatch(
              "addWatchedItem",
              this.data.listWithPin.shortId
            );
          }
        })
        .catch(console.log);
    },
    hideModal() {
      this.cpModal.style.display = "none";
    },
    addItem() {
      this.newString = this.newString.replaceAll(/(\r\n|\n|\r)/gm, "");
      if (this.newString.length > 512) {
        this.error = "to long! Only 512 Characters allowed";
        return;
      }
      this.newString = this.newString.replaceAll("\\", "\\\\");

      console.log(this.newString);
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
          this.newString = "";
          this.data.listWithPin.items = data.data.addItem.items;
        })
        .catch(console.log);
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.list {
  display: block;
  text-align: center;
  word-break: break-all;
  background-color: lightgrey;
  margin: 5px;
  padding: 5px;
  border-radius: 15px;
}
.listRow {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.grid {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.grid-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.btnAddMsg {
  height: 25px !important;
  width: 50px !important;
  font-size: 16px !important;
}
.btnClipboard {
  height: 25px;
  width: 25px;
}
.textArea {
  border: 1px solid black;
  min-height: 50px;
  min-width: 240px;
  font-size: 18px;
  word-break: break-all;
}
.modal {
  display: none;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}
/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
@media all and (-ms-high-contrast: none) {
  *::-ms-backdrop,
  .textArea {
    white-space: pre;
  }
}
</style>