import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RowConfigerComponent } from "./row-configer.component";

describe("RowConfigerComponent", () => {
  let component: RowConfigerComponent;
  let fixture: ComponentFixture<RowConfigerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RowConfigerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowConfigerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
