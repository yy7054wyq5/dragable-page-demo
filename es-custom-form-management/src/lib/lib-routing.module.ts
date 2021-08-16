import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DragToGeneratePageComponent } from "./drag-to-generate-page/drag-to-generate-page.component";

const routes: Routes = [
  {
    path: "",
    component: DragToGeneratePageComponent,
    data: { title: "Sample" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibRoutingModule {}
