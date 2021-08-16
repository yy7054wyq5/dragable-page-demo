import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ItemConfigerComponent } from "./item-configer.component";

describe("ItemConfigerComponent", () => {
  let component: ItemConfigerComponent;
  let fixture: ComponentFixture<ItemConfigerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemConfigerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemConfigerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
