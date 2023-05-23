<script setup lang="ts">
import FnSchema   from './fn-schema.vue';
import TestSchema from './test-schema.ts';
import { ref }    from 'vue';

const formData = ref({
  user: {
    name: 'francyfox',
    email: 'test@mail.ru',
    age: 16,
    agree: true,
    gender: ['song4'],
    live: 'live',
    test: false
  },
});

</script>

<template>
  <n-config-provider>
    <fn-schema v-model:data="formData" :schema="TestSchema"/>
    <pre>{{ JSON.stringify(formData.user, null, 4) }}</pre>
  </n-config-provider>
</template>

<style scoped>

</style>