import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { CreateSkilllevelComponent } from './create-skilllevel.component';

describe('CreateSkilllevelComponent', () => {
  let component: CreateSkilllevelComponent;
  let fixture: ComponentFixture<CreateSkilllevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, RouterTestingModule ],
      providers: [ FormBuilder ],
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
