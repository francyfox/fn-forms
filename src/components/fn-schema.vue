<script setup lang="ts">
import naiveUISchemaParser, { NaiveUISchema } from "../module/schema/schema.parser.ts";
import {defineAsyncComponent, h} from 'vue'

const props = defineProps<{
  schema: NaiveUISchema
}>()


const node = naiveUISchemaParser(props.schema)

</script>

<template>
  <div class="schema">
      <h1>Test</h1>
      <template v-for="i of node">
          <component :is="i"/>
      </template>
  </div>
</template>

<style scoped>

</style>