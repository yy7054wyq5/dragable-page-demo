import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { DraggedItem } from "../defines";

@Component({
  selector: "es-row-configer",
  templateUrl: "./row-configer.component.html",
  styleUrls: ["./row-configer.component.scss"],
})
export class RowConfigerComponent implements OnInit {
  configerForm: FormGroup;

  @Input() data: DraggedItem;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.data) {
      this.configerForm = this.fb.group({
        size: this.data.size,
      });
    }
  }
}
