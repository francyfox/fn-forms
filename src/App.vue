<script setup lang="ts">
import FnSchema   from './lib/components/fn-schema.vue';
import TestSchema from './test/TestSchema.ts';
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
  </n-config-provider>
  <pre>{{ JSON.stringify(formData.user, null, 4) }}</pre>
</template>

<style scoped>

</style>