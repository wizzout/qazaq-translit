<template>
  <div contenteditable="true" @input="update"></div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.$el.innerText = this.value;
  },
  watch: {
    value: {
      handler(val) {
        if( this.$el && this.$el.innerText !== val) {
          this.$el.innerText = val;
        }
      },
      immediate: true
    }
  },
  methods: {
    update(event) {
      this.$emit('input', event.target.innerText);
    }
  }
}
</script>

<style>

</style>
