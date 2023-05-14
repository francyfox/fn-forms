import { NaiveUISchema, NaiveUITypes } from "./schema";
import { defineAsyncComponent } from 'vue'

export default function naiveUISchemaParser(json: NaiveUISchema) {
  for (const _el of json) {
    switch (_el.$type) {
      case NaiveUITypes.Form:

      default:
        throw new Error('Element property $type not defined')
    }
  }
}
//
export const fnComponent = (name: string) => defineAsyncComponent(() => import(`naive-ui/lib/${name}`))