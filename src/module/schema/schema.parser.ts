// @ts-ignore
import NaiveUISchema = FNScheme.NaiveUISchema;
import {toPascalCase} from "../../helper/helper.path.ts";
import {h, RendererElement, RendererNode, resolveComponent, VNode} from "vue";

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
}

export const fnComponentPath = (name: string) => `/node_modules/naive-ui/es/${name}/src/${toPascalCase(name)}.js`
export default function naiveUISchemaRender(json: NaiveUISchema) {
  const [first] = json

  return renderElement(first)
}

export function renderElement(_el: NaiveUISchemaEl) {
  const index = Object.values(NaiveUITypes).indexOf(_el.$type as unknown as NaiveUITypes)

  if (index === -1) {
    throw new Error(
        `Type ${_el.$type} is not support. Supported types: \n ${JSON.stringify(NaiveUITypes, null, 4)}`
    )
  }

  const { $type, ...schemeEl } = _el
  const { $children, ...props} = schemeEl
  const component = resolveComponent(_el.$type)

  return h(component, props, renderChildren($children))
}

export function renderChildren(children: NaiveUISchema | string): VNode<RendererNode, RendererElement, {[p: string]: any}>[] | string {
  return (Array.isArray(children))
      ? children.map((i: NaiveUISchemaEl) => renderElement(i))
      : children
}