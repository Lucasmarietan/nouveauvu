<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="loadCats">Give me cats</button>
    <div v-for="cat in cats" :key="cat.id" class="cat">
      <img :src="cat.url" class="img" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      cats: []
    };
  },
  mounted() {
    this.loadCats();
  },
  methods: {
    loadCats() {
      axios
        .get("https://api.thecatapi.com/v1/images/search?limit=6", {
          headers: {
            "x-api-key": "DEMO-API-KEY"
          }
        })
        .then(response => {
          this.cats = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.cat {
  width: 100px;
  height: 100px;
}

.img{
  float: left;
}
</style>
