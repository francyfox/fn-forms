// @ts-ignore
import NaiveUISchema = FNScheme.NaiveUISchema;
import {nestedObjectByPath, resolve, toPascalCase} from "../../helper/helper.path.ts";
import {h, ref, Ref, RendererElement, RendererNode, resolveComponent, VNode} from "vue";
import merge from "deepmerge";

export enum NaiveUITypes {
  Form = 'n-form',
  Input = 'n-input',
  InputNumber = 'n-input-number',
  FormItem = 'n-form-item',
  Button = 'n-button',
  Checkbox = 'n-checkbox'
}

export type NaiveUISchema = NaiveUISchemaEl[]
export declare interface NaiveUISchemaEl {
  $type: NaiveUITypes
  $children: NaiveUISchema | string
  $props: any
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

  if (_el.$type === NaiveUITypes.Input
      || _el.$type === NaiveUITypes.InputNumber
  ) {
    const path = $props.value as string
    $props.value = ref(resolveRefVarByPath(path, formData)) as Ref<string>
    $props = {
      ...$props,
      onUpdateValue: (v: any) => updateFormItemValue({ $props, v, path, formData })
    }
  } else if(_el.$type === NaiveUITypes.Checkbox) {
    const path = $props.value as string
    $props.checked = ref(resolveRefVarByPath(path, formData)) as Ref<string>
    $props = {
      ...$props,
      onUpdateChecked: (v: any) => updateFormItemValue({ $props, v, path, formData })
    }
  }

  // @ts-ignore
  return h(component, $props, renderChildren($children, formData))
}

export function renderChildren(children: NaiveUISchema | string, formData: Ref<object>): VNode<RendererNode, RendererElement, {
  [p: string]: any
}>[] | { default: () => NaiveUISchema | string } {
  return (Array.isArray(children))
      ? children.map((i: NaiveUISchemaEl) => renderElement(i, formData))
      : { default: () => children ?? '' }
}

type fnValueArguments = {
  $props: any,
  v: any,
  path: string,
  formData: any
}

export function updateFormItemValue(argument: fnValueArguments) {
  const { $props, v, path, formData } = argument
  const inputDeep = nestedObjectByPath(path, v)
  const merged = merge(formData, inputDeep, {
    arrayMerge: () => path.replace('$data.', '').split('.')
  })
  Object.assign(formData, merged)
  return ($props.value.value)
      ? $props.value.value = v
      : $props.checked.value = v
}

