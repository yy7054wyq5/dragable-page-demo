import {
  Component,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";

import { Router, Event, NavigationStart } from "@angular/router";
import { en_US, zh_CN, NzI18nService } from "ng-zorro-antd/i18n";
import { AppModuleLoadObserver } from "./app.module.loadobserver";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [],
})
export class AppComponent implements OnInit {
  title = "Angular";
  timer: any = null;

  @ViewChild("targetRef", { read: ViewContainerRef, static: false })
  vcRef: ViewContainerRef;

  constructor(
    private injector: Injector,
    private i18n: NzI18nService,
    router: Router
  ) {}

  isExpandMenu = false;

  ngOnInit() {}

  changeLang(lang) {}
}
