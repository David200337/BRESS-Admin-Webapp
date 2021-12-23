import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSkilllevelComponent } from './create-skilllevel.component';

describe('CreateSkilllevelComponent', () => {
  let component: CreateSkilllevelComponent;
  let fixture: ComponentFixture<CreateSkilllevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSkilllevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSkilllevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
