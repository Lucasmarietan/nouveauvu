<template>
  <div>
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
    <transition name="fade">
      <div v-if="montant !== '' && montant <= 0" class="error">
        Montant {{ montant || chf }} doit être suppérieur à 0
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      montant: ""
    };
  },
  methods: {
    ajouter() {
      this.$emit("ajouter", this.montant);
      this.montant = "";
    }
  }
};
</script>

<style>
.error {
  color: red;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
