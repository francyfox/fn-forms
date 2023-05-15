// @ts-ignore
import NaiveUISchema = FNScheme.NaiveUISchema;
import {toPascalCase} from "../../helper/helper.path.ts";
import {defineAsyncComponent, h} from "vue";
export enum NaiveUITypes {
  Form = 'form',
  Input = 'input',
}

export type NaiveUISchema = NaiveUISchemaEl[]
export declare interface NaiveUISchemaEl {
  $type: NaiveUITypes
  $children: any[]
}

export const fnComponentPath = (name: string) => `/node_modules/naive-ui/es/${name}/src/${toPascalCase(name)}.js`
export default function naiveUISchemaParser(json: NaiveUISchema) {
  return json.map((_el: any) => {
    const index = Object.values(NaiveUITypes).indexOf(_el.$type as unknown as NaiveUITypes)

    if (index === -1) {
      throw new Error(
          `Type ${_el.$type} is not support. Supported types: \n ${JSON.stringify(NaiveUITypes, null, 4)}`
      )
    }

    const { $type, ...schemeEl } = _el
    const { $children, ...props} = schemeEl

    return h(defineAsyncComponent(() => import(fnComponentPath(_el.$type))), props)
  })
}