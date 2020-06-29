<template>
  <li v-bind:class="{ high: item.value > 9 }">
    <img :src="item.value | imgURL" class="badge" />
    {{ item.value | chf }}
    <button v-on:click="supprimer()">x</button>
  </li>
</template>

<script>
export default {
  // props = paramètre que nous recevons
  props: ["item"],
  methods: {
    supprimer() {
      this.$emit("supprimer");
    }
  },
  filters: {
    imgURL(value) {
      let level = 1;
      if (value > 10) {
        level = 2;
      }
      if (value > 20) {
        level = 3;
      }
      return `https://gistcdn.githack.com/bfritscher/6ff8e74b80d44616944843fe83cc5d19/raw/2d4e25748fbbe681681932444a7ef339c90d4dde/chevron_${level}.svg`;
    }
  }
};
</script>

<style scoped>
.high {
  color: gold;
}

.badge {
  width: 30px;
}

.flip-list-move {
  transition: transform 1s;
}
</style>
