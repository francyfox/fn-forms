<script setup lang="ts">
import naiveUISchemaRender, { NaiveUISchema } from "../module/schema/schema.parser.ts";

const props = defineProps<{
  schema: NaiveUISchema
}>()


const NFormNode = naiveUISchemaRender(props.schema)
console.log(NFormNode)

</script>

<template>
  <div class="schema">
      <h1>Test</h1>
      <Suspense>
          <n-form-node/>
          <template #fallback>
              ...Loading
          </template>
      </Suspense>
  </div>
</template>

<style scoped>

</style>