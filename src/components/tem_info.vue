<template>
  <div class="message-alert">
    <div class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, key) in messages" :key="key">
      {{ item.message }}
      <button type="button" class="close" style="transform: translateY(-5px);"
      @click="$store.commit('REMOVEMESSAGE', key)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tem_info',
  computed: {
    messages() {
      return this.$store.state.messages;
    },
  },
};
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>
