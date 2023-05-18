// @ts-ignore
import NaiveUISchema = FNScheme.NaiveUISchema;
import {resolve, toPascalCase} from "../../helper/helper.path.ts";
import {h, ref, Ref, RendererElement, RendererNode, resolveComponent, VNode} from "vue";

export enum NaiveUITypes {
  Form = 'n-form',
  Input = 'n-input',
  FormItem = 'n-form-item',
  Button = 'n-button'
}

export type NaiveUISchema = NaiveUISchemaEl[]
export declare interface NaiveUISchemaEl {
  $type: NaiveUITypes
  $children: NaiveUISchema | string
  $props: { [key: string]: unknown }
}

/**@deprecated **/
export const fnComponentPath = (name: string) => `/node_modules/naive-ui/es/${name}/src/${toPascalCase(name)}.js`

export const resolveRefVarByPath = (value: string, data: Ref<object>) => {
  const path = value.replace('$data.', '')
  return resolve(path, data, '.')
}
export default function naiveUISchemaRender(json: NaiveUISchema, data: Ref<object>) {
  const [first] = json

  return renderElement(first, data)
}

export function renderElement(_el: NaiveUISchemaEl, formData: Ref<object>) {
  const index = Object.values(NaiveUITypes).indexOf(_el.$type as unknown as NaiveUITypes)

  if (index === -1) {
    throw new Error(
        `Type ${_el.$type} is not support. Supported types: \n ${JSON.stringify(NaiveUITypes, null, 4)}`
    )
  }

  const { $type, ...schemeEl } = _el
  let { $children, $props } = schemeEl
  const component = resolveComponent(_el.$type)

  switch (_el.$type) {
    case NaiveUITypes.Input:
      $props.value = ref(resolveRefVarByPath($props.value, formData)) as Ref<string>
      $props = {
        ...$props,
        onUpdateValue: (v: any) => $props.value.value = v
      }
  }

  return h(component, $props, renderChildren($children, formData))
}

export function renderChildren(children: NaiveUISchema | string, formData: Ref<object>): VNode<RendererNode, RendererElement, {[p: string]: any}>[] | string {
  return (Array.isArray(children))
      ? children.map((i: NaiveUISchemaEl) => renderElement(i, formData))
      : children
}
