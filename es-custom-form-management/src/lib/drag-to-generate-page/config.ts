import { DraggedItemType, DraggedItem } from "./defines/interface";
export const SortName = "drag";
export const ModalClassName = "drag-modal";
export const TodoPlaceholderClassName = "drag-todo-placeholder";

export const DraggedTypeNames = {
  [DraggedItemType.input]: "输入框",
  [DraggedItemType.select]: "下拉框",
  [DraggedItemType.layout]: "布局",
  [DraggedItemType.grid]: "表格",
};

export const DraggerLayoutSourceData: DraggedItem[] = [
  {
    label: null,
    name: null,
    value: null,
    size: 2,
    typeName: DraggedTypeNames[DraggedItemType.layout],
    type: DraggedItemType.layout,
  },
  {
    label: null,
    name: null,
    value: null,
    size: 2,
    typeName: DraggedTypeNames[DraggedItemType.grid],
    type: DraggedItemType.grid,
  },
];
export const DraggedSourceData: DraggedItem[] = [
  {
    label: null,
    name: null,
    value: null,
    type: DraggedItemType.input,
    typeName: DraggedTypeNames[DraggedItemType.input],
    data: null,
  },
  {
    label: null,
    name: null,
    value: null,
    type: DraggedItemType.select,
    typeName: DraggedTypeNames[DraggedItemType.select],
    data: null,
  },
];
