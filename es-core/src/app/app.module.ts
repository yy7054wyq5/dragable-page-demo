import { BrowserModule } from "@angular/platform-browser";
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from "@angular/core";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule, NgModel } from "@angular/forms";

import { StSharedModule } from "es-core-shared";
import { environment } from "../environments";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

/* import from _services */

/* import from _pipes */
// import { placeholderTipsPipe, fieldProcessPipe, optionValFilterPipe, itervalFilterPipe, optionNameFilterPipe,WorkflowStatusConverter, SearchFilterPipe, MinutesToHour }    from './_pipes/string.pipe';

/* import ui library */
import {
  NgZorroAntdModule,
  NZ_I18N,
  zh_CN,
  NzToolTipModule,
  NzOverlayModule,
  NZ_CONFIG,
} from "ng-zorro-antd";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import {DragDropModule} from '@angular/cdk/drag-drop';

/* date Internationalization */
import { registerLocaleData } from "@angular/common";
import zh from "@angular/common/locales/zh";

/* import translation */

/* import third-party plugin */
// import { ScrollEventModule } from 'ngx-scroll-event';
// import { EssenceNg2PrintModule } from "essence-ng2-print"

/* import ECharts */
// import { NgxEchartsModule } from 'ngx-echarts';

import { NzIconModule } from "ng-zorro-antd/icon";

/* import ColorPicker */
// import { ColorPickerModule } from 'ngx-color-picker';

registerLocaleData(zh);

import { IconDefinition } from "@ant-design/icons-angular";
import { NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS } from "ng-zorro-antd/icon";

// 引入你需要的图标，比如你需要 fill 主题的 AccountBook Alert 和 outline 主题的 Alert，推荐 ✔️
import {
  PlusCircleOutline,
  DeleteOutline,
  EditOutline,
} from "@ant-design/icons-angular/icons";

const icons: IconDefinition[] = [PlusCircleOutline, DeleteOutline, EditOutline];

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    FormsModule,
    // ScrollEventModule,
    // NgxEchartsModule,
    ReactiveFormsModule,
    // DragDropModule,
    NzToolTipModule,
    NzIconModule,
    // ColorPickerModule,
    // EssenceNg2PrintModule,
    NzOverlayModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    NgModel,
    { provide: NZ_I18N, useValue: zh_CN },
    {
      provide: NZ_CONFIG,
      useValue: {
        message: {
          nzMaxStack: 3,
        },
      },
    },
    { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: "#00ff00" }, // 不提供的话，即为 Ant Design 的主题蓝色
    { provide: NZ_ICONS, useValue: icons },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
