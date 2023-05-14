# FN-Scheme
#### Form schema component for Naive UI framework. Generate form from json like formkit schema component
## Documentation [link](#)

Package type: `Module`


#### TREE
- [How to use](#how-to-use)




### How to Use

Install command

```shell
pnpm i @francfox/fn-forms
```

Import component

```vue

<script setup type="ts">
import { FnSchema } from '@francyfox/fn-forms'
import { NaiveUISchema } from "@francyfox/fn-forms/module/schema";

const json = {
  $type: 'form',
  children: []
} as NaiveUISchema
</script>

<template>
  <fn-schema :schema="json"/>
</template>
```

#### Available components:
- Form
- Input


#### CHANG