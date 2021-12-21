import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtItemComponent } from './court-item.component';

describe('CourtItemComponent', () => {
  let component: CourtItemComponent;
  let fixture: ComponentFixture<CourtItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourtItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
