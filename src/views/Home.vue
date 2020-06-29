<template>
  <div class="home">
    <h1>Donations</h1>
    <ajouter-montant v-on:ajouter="ajouter"></ajouter-montant>
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
    <transition-group name="flip-list" tag="ul">
      <list-item
        v-for="n in sortedList"
        v-bind:key="n.id"
        v-bind:item="n"
        v-on:supprimer="supprimer(n)"
      ></list-item>
    </transition-group>
    <p>Total : {{ total | chf }}</p>
    <ajouter-montant v-on:ajouter="ajouter"></ajouter-montant>
  </div>
</template>
<script>
import ListItem from "@/components/ListItem";
import AjouterMontant from "@/components/AjouterMontant";
import { v4 as uuidv4 } from "uuid";

const APP_KEY = "MaListe";

function createMontant(value) {
  return {
    id: uuidv4(),
    value
  };
}
export default {
  name: "Home",
  data() {
    const json2 = localStorage.getItem("key_sort_type");
    let sortType = "recent";
    if (json2) {
      try {
        sortType = JSON.parse(json2);
      } catch (e) {
        console.log(e);
      }
    }

    return {
      montant: "",
      montants: [createMontant(1), createMontant(2)],
      sortType: sortType
    };
  },
  mounted() {
    // Quand le composant est dans la page
    const json = localStorage.getItem(APP_KEY);
    if (json) {
      this.montants = JSON.parse(json);
    }
  },
  methods: {
    ajouter(montant) {
      this.montants.push(createMontant(montant));
      this.montant = "";
      this.saveData();
    },
    supprimer(n) {
      const index = this.montants.indexOf(n);
      if (index >= 0) {
        this.montants.splice(index, 1);
      }
      this.saveData();
    },
    saveData() {
      localStorage.setItem(APP_KEY, JSON.stringify(this.montants));
    }
  },
  watch: {
    sortType() {
      localStorage.setItem("key_sort_type", JSON.stringify(this.sortType));
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
  },
  components: {
    "list-item": ListItem,
    "ajouter-montant": AjouterMontant
  }
};
</script>

<style scoped></style>

<style></style>
