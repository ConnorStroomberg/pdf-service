<template>
  <div id="app">
    <h1>Hello {{msg}}</h1>
    <p>
      <button @click="handleBtnClick" type="button">Make pdf</button>
    </p>
    <a href="http://localhost:3000/makepdf">click</a>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "app",
  data: () => {
    return {
      msg: "Client"
    };
  },
  methods: {
    handleBtnClick: () => {
      axios
        .post(
          "http://localhost:3000/makepdf",
          {
            hello: "bar"
          },
          {
            headers: {
              "Content-Type": "application/json"
            },
            responseType: "blob"
          }
        )
        .then(response => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "file.pdf");
          // document.body.appendChild(fileLink);

          fileLink.click();
        });
    }
  }
};
</script>

<style>
button {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-weight: bold;
  font-size: 16px;
  padding: 8px 16px;
  background-color: #0000ff;
  color: white;
  border: 1px grey;
}

button:hover {
  cursor: pointer;
  background-color: #0b0bf1;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border: 1px black;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
