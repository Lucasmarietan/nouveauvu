<template>
  <div class="home">
    <h1>Donations</h1>
    <p>
      Montant
      <input type="number" v-model.number="montant" />
      <button
        v-on:click="ajouter()"
        v-bind:disabled="montant !== '' && montant <= 0"
      >
        ajouter
      </button>
    </p>
    <div v-if="montant !== '' && montant <= 0" class="error">
      Montant {{ montant || chf }} doit être suppérieur à 0
    </div>
    <p>
      <label>
        Recent
        <input type="radio" name="sortType" value="recent" v-model="sortType" />
      </label>
      <label>
        Top
        <input type="radio" name="sortType" value="top" v-model="sortType" />
      </label>
    </p>
    <ul>
      <li
        v-bind:class="{ high: n.value > 9 }"
        v-for="(n, index) in sortedList"
        v-bind:key="index"
      >
        <img :src="n.value | imgURL" class="badge" />
        {{ n.value | chf }}
        <button v-on:click="supprimer(n)">x</button>
      </li>
    </ul>
    <p>Total : {{ total | chf }}</p>
  </div>
</template>

<script>
function createMontant(value) {
  return {
    value
  };
}
export default {
  name: "Home",
  data() {
    return {
      montant: "",
      montants: [createMontant(1), createMontant(2)],
      sortType: "recent"
    };
  },
  methods: {
    ajouter() {
      this.montants.push(createMontant(this.montant));
      this.montant = "";
    },
    supprimer(n) {
      const index = this.montants.indexOf(n);
      if (index >= 0) {
        this.montants.splice(index, 1);
      }
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
    },
    chf(value) {
      return `${value.toFixed(2)} CHF`;
    }
  },
  computed: {
    sortedList() {
      if (this.sortType === "recent") {
        return this.montants.slice().reverse();
      }
      if (this.sortType === "top") {
        return this.montants.slice().sort((a, b) => {
          return b.value - a.value;
        });
      }
      return this.montants;
    },
    total() {
      return this.montants.reduce((total, e) => total + e.value, 0);
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}

.high {
  color: gold;
}

.badge {
  width: 30px;
}
</style>
