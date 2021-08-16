import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { NzModalService } from "ng-zorro-antd";
import { ModalClassName } from "../config";
import { DragRow, TodoDragging } from "../drag-to-generate-page.class";
import { RowConfigerComponent } from "../row-configer/row-configer.component";
import {
  concatCellIdsInRows,
  generateModalConfig,
  DraggedItem,
  DraggedItemType,
} from "../defines";

@Component({
  selector: "es-drag-layout",
  templateUrl: "./drag-layout.component.html",
  styleUrls: ["./drag-layout.component.scss"],
})
export class DragLayoutComponent implements OnInit, OnChanges {
  DraggedItemType = DraggedItemType;
  @Input() dragging: TodoDragging<DraggedItem>;
  @Input() id: string = null;
  @Input() placeholder: string = null;

  @Output() itemDropped = new EventEmitter<{
    info: CdkDragDrop<DraggedItem[]>;
    items: DraggedItem[];
  }>();
  @Output() itemEdited = new EventEmitter<{
    item: DraggedItem;
    items: DraggedItem[];
    crtIndex: number;
  }>();

  @Input() rowEditedEnable = false;
  @Output() rowEdited = new EventEmitter<{
    row: DragRow;
    rows: DragRow[];
    crtIndex: number;
  }>();

  dragRows: DragRow[] = [];
  @Input() rows: DraggedItem[] = [];
  @Input() beforeRowDropped: (info: CdkDragDrop<DragRow[]>) => boolean;
  @Output() rowDropped = new EventEmitter<boolean>();
  @Output() rowsChange = new EventEmitter<DragRow[]>();
  @Output() cellIdsChange = new EventEmitter<string[]>();

  constructor(private nzModalService: NzModalService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rows && changes.rows.currentValue) {
      this.updateDragRows(this.rows);
    }
  }

  ngOnInit() {}

  private emitCellIds() {
    const cellIds = concatCellIdsInRows(this.dragRows);
    this.cellIdsChange.emit(cellIds);
  }

  private creatDragRows(data: Array<DraggedItem | DragRow>): DragRow[] {
    const tmp = [...data];
    const rows = [];
    for (let idx = 0; idx < tmp.length; idx++) {
      const row = tmp[idx];
      if (row instanceof DragRow) {
        rows.push(row.updateCells(idx));
      } else {
        rows.push(new DragRow(row, idx, this.id));
      }
      if (rows.length === tmp.length) {
        return rows;
      }
    }
    return [];
  }

  private updateDragRows(data?) {
    this.dragRows = this.creatDragRows(data || this.dragRows);
    this.emitCellIds();
    this.rowsChange.emit(this.dragRows);
  }

  removeRow(index: number) {
    this.nzModalService.confirm({
      nzTitle: "确定删除该行？",
      nzClassName: ModalClassName,
      nzOnOk: () => {
        this.dragRows.splice(index, 1);
        this.updateDragRows();
      },
    });
  }

  rowLayoutDropped(info: CdkDragDrop<DragRow[]>) {
    if (
      (this.beforeRowDropped && this.beforeRowDropped(info)) ||
      !this.beforeRowDropped
    ) {
      const {
        currentIndex,
        previousContainer,
        container,
        previousIndex,
      } = info;
      if (previousContainer === container) {
        moveItemInArray(this.dragRows, previousIndex, currentIndex);
        this.rowsChange.emit(this.dragRows);
        return;
      }
      const modalConfig = generateModalConfig<DraggedItem>({
        data: this.dragging.data,
        isHandelConfig: false,
        targets: this.rows,
        crtIndex: currentIndex,
        cb: (updatedTargets, crtData, crtIndex) => {
          if (updatedTargets) {
            this.dragRows.splice(crtIndex, 0, ...this.creatDragRows([crtData]));
            this.updateDragRows();
          }
          this.rowDropped.emit(true);
        },
      });
      modalConfig.nzTitle = "配置布局";
      modalConfig.nzContent = RowConfigerComponent;
      this.nzModalService.confirm(modalConfig);
    }
  }

  formItemDropped(info: CdkDragDrop<DraggedItem[]>, items: DraggedItem[]) {
    this.itemDropped.emit({
      info,
      items,
    });
  }

  removeItem(index: number, data: DraggedItem[]) {
    data.splice(index, 1);
  }

  editRow(row: DragRow, crtIndex: number) {
    if (!this.rowEditedEnable) {
      return;
    }
    this.rowEdited.emit({
      row,
      rows: this.dragRows,
      crtIndex,
    });
  }

  editItem(item, items, crtIndex) {
    this.itemEdited.emit({
      item,
      items,
      crtIndex,
    });
  }
}
