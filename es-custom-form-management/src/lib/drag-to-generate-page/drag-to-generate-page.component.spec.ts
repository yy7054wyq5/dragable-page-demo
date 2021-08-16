import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DragToGeneratePageComponent } from "./drag-to-generate-page.component";

describe("DragToGeneratePageComponent", () => {
  let component: DragToGeneratePageComponent;
  let fixture: ComponentFixture<DragToGeneratePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DragToGeneratePageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragToGeneratePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
