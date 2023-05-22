// @ts-ignore
import NaiveUISchema = FNScheme.NaiveUISchema;

export enum NaiveUITypes {
    Form = 'n-form',
    Input = 'n-input',
    InputNumber = 'n-input-number',
    FormItem = 'n-form-item',
    Button = 'n-button',
    Space = 'n-space',
    Select = 'n-select',
    Checkbox = 'n-checkbox',
    Radio = 'n-radio',
    RadioGroup = 'n-radio-group'
}

export const sortComponentsByAction = {
    value: [
        NaiveUITypes.Input.valueOf(),
        NaiveUITypes.InputNumber.valueOf(),
        NaiveUITypes.Select.valueOf(),
        NaiveUITypes.RadioGroup.valueOf(),
    ],
    checked: [
        NaiveUITypes.Checkbox.valueOf(),
        NaiveUITypes.Radio.valueOf(),
    ],
}

export const hasValueAction = (v: string) => sortComponentsByAction.value.includes(v)
export const hasCheckedAction = (v: string) => sortComponentsByAction.checked.includes(v)

export type NaiveUISchema = NaiveUISchemaEl[]

export declare interface NaiveUISchemaEl {
    $type: NaiveUITypes;
    $children: NaiveUISchema | string;
    $props: any;
}


export type fnValueArguments = {
    $props: any,
    v: any,
    path: string,
    formData: any
}
