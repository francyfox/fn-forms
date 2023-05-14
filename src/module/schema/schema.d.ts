export enum NaiveUITypes {
  Form = 'form',
  Input = 'input',
}

export type NaiveUISchema = NaiveUISchemaEl[]
export declare interface NaiveUISchemaEl {
  $type: NaiveUITypes
  $children: any[]
}