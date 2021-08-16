///<reference path="./es-typings.d.ts"/>

import { CommonModule } from "@angular/common";
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LibRoutingModule } from "./lib-routing.module";

/* import ui library */
import {
  NgZorroAntdModule,
  NzToolTipModule,
  NzOverlayModule,
} from "ng-zorro-antd";
// import { DragDropModule } from '@angular/cdk/drag-drop';

/* import translation */
import { TranslateModule } from "@ngx-translate/core";

/* import third-party plugin */
// import { ScrollEventModule } from 'ngx-scroll-event';
// import { EssenceNg2PrintModule } from "essence-ng2-print"

/* import ECharts */
// import { NgxEchartsModule } from 'ngx-echarts';

// import { NzIconModule } from 'ng-zorro-antd/icon';

/* import ColorPicker */
// import { ColorPickerModule } from 'ngx-color-picker';

/* import from components */
import { SampleComponent } from "./components/sample/sample.component";
import { DragToGeneratePageModule } from "./drag-to-generate-page/drag-to-generate-page.module";

@NgModule({
  imports: [
    CommonModule,
    LibRoutingModule,
    NgZorroAntdModule,
    DragToGeneratePageModule,
    // FormsModule,
    // ScrollEventModule,
    // NgxEchartsModule,
    // ReactiveFormsModule,
    // DragDropModule,
    // NzToolTipModule,
    // NzIconModule,
    // ColorPickerModule,
    // EssenceNg2PrintModule,
    TranslateModule,
    // NzOverlayModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  declarations: [SampleComponent],
})
export class LibModule {
  constructor() {}
}
