import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { DragToGeneratePageComponent } from "./drag-to-generate-page.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ItemContainerComponent } from "./item-container/item-container.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ItemConfigerComponent } from "./item-configer/item-configer.component";
import { DragLayoutComponent } from "./drag-layout/drag-layout.component";
import { RowConfigerComponent } from "./row-configer/row-configer.component";

@NgModule({
  declarations: [
    DragToGeneratePageComponent,
    ItemContainerComponent,
    ItemConfigerComponent,
    DragLayoutComponent,
    RowConfigerComponent,
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [ItemConfigerComponent, RowConfigerComponent],
})
export class DragToGeneratePageModule {}
