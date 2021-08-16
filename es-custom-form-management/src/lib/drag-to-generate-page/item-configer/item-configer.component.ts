import { Component, OnInit, Input } from "@angular/core";
import { DraggedItem } from "../defines";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "es-item-configer",
  templateUrl: "./item-configer.component.html",
  styleUrls: ["./item-configer.component.scss"],
})
export class ItemConfigerComponent implements OnInit {
  private pdata: DraggedItem;
  @Input() set data(data: DraggedItem) {
    if (!data) {
      return;
    }
    this.pdata = JSON.parse(JSON.stringify(data));
  }

  get data() {
    return this.pdata;
  }

  configerForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.configerForm = this.fb.group({
      label: [this.pdata.label, [Validators.required]],
      name: [this.pdata.name, [Validators.required]],
      value: [this.pdata.value],
      placeholder: [this.pdata.placeholder],
      data: [this.pdata.data],
    });
  }
}
