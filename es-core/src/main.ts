import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments";

/** echarts extensions: */
// import 'echarts-gl';
import "echarts/theme/macarons.js";
import "echarts/dist/extension/bmap.min.js";
// import 'echarts/theme/dark.js';

if (environment.production) {
  enableProdMode();
}

document.addEventListener("DOMContentLoaded", () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
});
