import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalchartComponent } from './horizontalchart.component';

describe('HorizontalchartComponent', () => {
  let component: HorizontalchartComponent;
  let fixture: ComponentFixture<HorizontalchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
