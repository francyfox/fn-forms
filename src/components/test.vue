<script setup lang="ts">
import FnSchema from "./fn-schema.vue";
import { NaiveUISchema } from "../module/schema/schema.parser.ts";

const json = [
    {
        $type: 'input',
        value: 'test'
    }
] as NaiveUISchema

</script>

<template>
    <n-config-provider>
        <fn-schema :schema="json"/>
    </n-config-provider>
</template>

<style scoped>

</style>