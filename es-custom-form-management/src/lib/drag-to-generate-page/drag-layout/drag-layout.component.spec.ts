import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DragLayoutComponent } from "./drag-layout.component";

describe("DragLayoutComponent", () => {
  let component: DragLayoutComponent;
  let fixture: ComponentFixture<DragLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DragLayoutComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
