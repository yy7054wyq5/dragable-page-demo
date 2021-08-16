export enum DraggedItemType {
  input = "input",
  select = "select",
  layout = "layout",
  grid = "grid",
}

export interface DraggedItem<dataT = any, valueT = any> {
  label: string;
  name: string;
  value: valueT;
  size?: number;
  type: DraggedItemType;
  typeName: string;
  data?: dataT;
  placeholder?: string;
}
