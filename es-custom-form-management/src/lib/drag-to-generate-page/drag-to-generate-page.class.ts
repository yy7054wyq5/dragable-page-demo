import { SortName } from "./config";
import {
  generateCellId,
  DraggedItemType,
  concatCellIdsInRows,
  DraggedItem,
} from "./defines";

export class DragCell {
  id: string;
  connectedIds: string[] = [];
  items: DraggedItem[] = [];
  constructor(id: string, connectedIds: string[]) {
    this.id = id;
    this.connectedIds = connectedIds;
  }

  // 只更新这两个值，主要是为了保留items
  updateId(id: string, connectedIds: string[]) {
    this.id = id;
    this.connectedIds = connectedIds;
  }
}

export class DragRow {
  rowIndex: number;
  size: number;
  cells: DragCell[] = [];
  cellIds: string[] = [];
  private cellIdPrefix: string = null;
  type: DraggedItemType = null;

  constructor(
    data: DraggedItem | number,
    rowIndex: number,
    cellIdPrefix: string
  ) {
    this.rowIndex = rowIndex;
    this.cellIdPrefix = cellIdPrefix;
    this.type = null;
    if (typeof data === "number") {
      this.size = data;
    } else {
      this.size = data.size;
      this.type = data.type;
    }
    this.creatCells(this.size);
  }
  creatCells(size: number) {
    if (!size) {
      return;
    }
    for (let index = 0; index < size; index++) {
      this.cellIds.push(
        generateCellId(this.cellIdPrefix, this.rowIndex, index)
      );
    }
    this.cellIds.forEach((id, idx) => {
      const tmpIds = [...this.cellIds];
      tmpIds.splice(idx, 1); // 移除自身的id
      const cell = this.cells[idx];
      if (cell) {
        cell.updateId(id, tmpIds);
      } else {
        this.cells.push(new DragCell(id, tmpIds));
      }
    });

    const cut = this.cells.length - this.cellIds.length; // 编辑时：单元格数量超出单元格id数量
    this.cells.splice(this.cellIds.length, cut); // 直接抛弃cell中的items
  }

  updateCells(rowIndex: number) {
    this.rowIndex = rowIndex;
    this.cellIds = [];
    this.creatCells(this.size);
    return this;
  }
}

export class Tab {
  title: string;
  edit: boolean;
  id: string;
  rows: DragRow[] = [];
  cellIds: string[] = [];
  constructor(title: string, tabIndex: number) {
    this.edit = true;
    this.title = title;
    this.id = `${SortName}-tab-${tabIndex}`;
    this.cellIds = concatCellIdsInRows((this.rows = this.creatRows()));
  }

  creatRows() {
    const tmp = [];
    for (let idx = 0; idx < 4; idx++) {
      tmp.push(new DragRow(2, idx, this.id));
    }
    return tmp;
  }
}

export class TodoDragging<T> {
  data: T;
  sources: T[];
  element: HTMLElement;
  constructor(data?: T, element?, sources?: T[]) {
    this.data = data || null;
    this.element = element || null;
    this.sources = sources || null;
  }

  get isFromTodo(): boolean {
    return this.element ? true : false;
  }
}
