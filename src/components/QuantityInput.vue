<template>
  <div class="quantity-input">
    <button class="quantity-input__button" @click="decrease">-</button>
    <div class="quantity-input__content">
      <span class="quantity-input__value">{{ value }}</span>
      <span class="quantity-input__unit">Adet</span>
    </div>
    <button class="quantity-input__button" @click="increase">+</button>
  </div>
</template>

<script>
export default {
      name: "QuantityInput",

  props: {
    max: {
      type: Number,
      default: 9999,
    },
    min: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      value: 0,
    }
  },
  mounted() {
    this.$emit('change', this.value)
  },
  methods: {
    increase() {
      if (this.value < this.max) {
        this.value += 1
        this.$emit('change', this.value)
      }
    },
    decrease() {
      if (this.value > this.min) {
        this.value -= 1
        this.$emit('change', this.value)
      }
    },
  },
}
</script>

<style >

</style>
