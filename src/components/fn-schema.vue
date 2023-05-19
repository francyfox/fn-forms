<script setup lang="ts">
import naiveUISchemaRender, { NaiveUISchema } from "../module/schema/schema.parser.ts";
import {PropType, reactive, Ref, watchEffect} from "vue";

const props = withDefaults(defineProps<{
  data: any,
  schema: NaiveUISchema
}>(), {
  data: {}
})
defineEmits(['update:data'])

const NFormNode = naiveUISchemaRender(props.schema, props.data)

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