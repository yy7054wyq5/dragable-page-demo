/*
router setting
*/
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "es-custom-form-management",
    pathMatch: "full",
  },
  {
    path: "",
    children: [
      {
        path: "es-custom-form-management",
        loadChildren: () =>
          import("../../../es-custom-form-management/src/lib/lib.module").then(
            (mod) => mod.LibModule
          ),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "home",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() {
    const sidebarList = [
      {
        code: "sample",
        featurePermission: 13,
        icon: "./assets/custom-form-management/images/custom-form-management.svg",
        sideBarChild: [
          {
            code: "sample",
            featureCode: "custom-form-management",
            featurePermission: 1,
            icon: "",
            path: "/es-custom-form-management",
            title: "sample",
          },
        ],
        title: "sample",
      },
    ];
    let sidebarListStr = JSON.stringify(sidebarList);
    localStorage.setItem("menu", sidebarListStr);
  }
}
