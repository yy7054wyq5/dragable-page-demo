import { Component, OnInit, Input } from "@angular/core";
import { DraggedItemType, DraggedItem } from "../defines";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "es-item-container",
  templateUrl: "./item-container.component.html",
  styleUrls: ["./item-container.component.scss"],
})
export class ItemContainerComponent implements OnInit {
  DraggedItemType = DraggedItemType;

  @Input() data: DraggedItem;
  @Input() showItemLabel = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}
}
