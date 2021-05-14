import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonListComponent } from './comparison-list.component';

describe('ComparisonListComponent', () => {
  let component: ComparisonListComponent;
  let fixture: ComponentFixture<ComparisonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
