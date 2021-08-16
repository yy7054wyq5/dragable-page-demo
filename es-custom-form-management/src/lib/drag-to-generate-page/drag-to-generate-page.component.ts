import { Component, OnInit, Inject, ViewEncapsulation } from "@angular/core";
import {
  CdkDragDrop,
  CdkDragExit,
  CdkDropList,
  CdkDragEnter,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { DOCUMENT } from "@angular/common";
import {
  NzModalService,
  NzMessageService,
  ModalOptionsForService,
} from "ng-zorro-antd";

import {
  DraggedSourceData,
  DraggerLayoutSourceData,
  TodoPlaceholderClassName,
} from "./config";
import { generateModalConfig, DraggedItem } from "./defines";
import { DragRow, TodoDragging, Tab } from "./drag-to-generate-page.class";
import { RowConfigerComponent } from "./row-configer/row-configer.component";

@Component({
  selector: "es-drag-to-generate-page",
  templateUrl: "./drag-to-generate-page.component.html",
  styleUrls: ["./drag-to-generate-page.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DragToGeneratePageComponent implements OnInit {
  todo: DraggedItem[] = DraggedSourceData;
  todoLayout: DraggedItem[] = DraggerLayoutSourceData;
  todoDragging = new TodoDragging<DraggedItem>();

  crtTab: Tab;
  tabs = [new Tab("tab1", 0), new Tab("tab2", 1)];

  constructor(
    private nzModalService: NzModalService,
    private nzMessageService: NzMessageService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.crtTab = this.tabs[0];
  }

  clickTab(tab: Tab) {
    this.crtTab = tab;
  }

  closeTab(index): void {
    this.tabs.splice(index, 1);
  }

  newTab(): void {
    this.tabs.push(new Tab("new Tab", this.tabs.length));
  }

  entered(event: CdkDragEnter<string>) {
    console.log("entered", event);
    // debugger;
  }

  private resetTodoDragging() {
    if (this.todoDragging.element) {
      this.todoDragging.element.remove();
    }
    this.todoDragging = new TodoDragging();
  }

  cellIdsChange(ids: string[], tab: Tab) {
    tab.cellIds = ids;
  }

  configRow(info: { row: DragRow; rows: DragRow[]; crtIndex: number }) {
    const { row, rows, crtIndex } = info;
    const modalConfig: ModalOptionsForService = generateModalConfig<DragRow>({
      data: row,
      targets: rows,
      crtIndex,
      isHandelConfig: true,
      cb: (updateTargets: any[]) => {
        if (updateTargets) {
          this.crtTab.rows = updateTargets;
        }
      },
    });
    modalConfig.nzContent = RowConfigerComponent;
    modalConfig.nzTitle = "配置行";
    this.nzModalService.confirm(modalConfig);
  }

  configFormItem(
    data: DraggedItem,
    options: {
      targets: DraggedItem[];
      crtIndex: number;
      isHandelConfig: boolean;
    }
  ) {
    const modalConfig: ModalOptionsForService = generateModalConfig({
      ...options,
      data,
      cb: () => {
        this.resetTodoDragging();
      },
    });
    this.nzModalService.confirm(modalConfig);
  }

  /**
   * @description 表单项移入
   */
  itemDropped(event: CdkDragDrop<DraggedItem[]>, targets: DraggedItem[]) {
    console.log("dropped", event, this.crtTab.rows);
    const { previousContainer, container, previousIndex, currentIndex } = event;
    if (this.todoDragging.isFromTodo) {
      if (previousContainer === container) {
        this.resetTodoDragging();
        return;
      }
      this.configFormItem(this.todoDragging.data, {
        targets,
        crtIndex: currentIndex,
        isHandelConfig: false,
      });
      return;
    }
    if (previousContainer === container) {
      moveItemInArray(container.data, previousIndex, currentIndex);
      return;
    }
    transferArrayItem(
      previousContainer.data,
      container.data,
      previousIndex,
      currentIndex
    );
  }

  // prettier-ignore
  beforeRowDropped = (info) => {
    const toggler = !info.container.data.length;
    if (toggler) {
      return true;
    }
    this.resetTodoDragging();
    this.nzMessageService.error("表格布局不能超过两行");
    return false;
  }

  rowDropped() {
    this.resetTodoDragging();
  }

  private fillToDolist(
    itemIndex: number,
    container: CdkDropList<DraggedItem[]>,
    sourceData: Array<DraggedItem>
  ) {
    this.todoDragging = new TodoDragging(
      sourceData[itemIndex],
      null,
      sourceData
    );

    this.todoDragging.element = this.document.createElement("div");
    this.todoDragging.element.innerText = sourceData[itemIndex].typeName;
    this.todoDragging.element.className = TodoPlaceholderClassName;

    const childNodes = container.element.nativeElement.childNodes;
    let refChild = null;
    childNodes.forEach((crtNode, idx) => {
      if (idx === itemIndex + 1 && itemIndex !== sourceData.length - 1) {
        refChild = crtNode;
      }
    });
    container.element.nativeElement.insertBefore(
      this.todoDragging.element,
      refChild
    );
  }

  exited(event: CdkDragExit<DraggedItem[]>, sources: DraggedItem[]) {
    console.log("exited", event);
    const { container, item } = event;
    const itemIndex = container.getItemIndex(item);
    if (
      (sources === this.todo || sources === this.todoLayout) &&
      !this.todoDragging.element
    ) {
      this.fillToDolist(itemIndex, container, sources);
    }
  }
}
