import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { CreateFieldComponent } from './create-field.component';

describe('CreateFieldComponent', () => {
  let component: CreateFieldComponent;
  let fixture: ComponentFixture<CreateFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule, RouterTestingModule],
      providers: [FormBuilder],
      declarations: [CreateFieldComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the same number of ui input elements as reactiveFormControls', () => {
    const formElement =
      fixture.debugElement.nativeElement.querySelector('form');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(1);
  });

  it('should check if formGroup is correct', () => {
    const fieldFromGroup = component.form;
    const fieldFormValues = {
      name: '',
    };
    expect(fieldFromGroup.value).toEqual(fieldFormValues);
  });

  it('should check if formControls required validation is correct', () => {
    const fieldNameInputElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('form')
        .querySelectorAll('input')[0];
    const fieldNameValue = component.form.get('name');
    expect(fieldNameInputElement.value).toEqual(fieldNameValue?.value);
    expect(fieldNameValue?.errors).not.toBeNull();
    expect(fieldNameValue?.errors).toBeTruthy();
  });

  it('should check if form is valid', () => {
    const fieldNameInputElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('form')
        .querySelectorAll('input')[0];
    fieldNameInputElement.value = 'Zaal 1';
    fieldNameInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const isFormValid = component.form.valid;
      expect(isFormValid).toBeTruthy;
    });
  });
});
