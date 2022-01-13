import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  convertToParamMap,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EditFieldComponent } from './edit-field.component';

describe('EditFieldComponent', () => {
  let component: EditFieldComponent;
  let fixture: ComponentFixture<EditFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [FormBuilder],
      declarations: [EditFieldComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the same number of ui input elements as reactiveFormControls', (done: DoneFn) => {
    const formElement =
      fixture.debugElement.nativeElement.querySelector('form');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(2);
    done();
  });

  it('should check if formGroup is correct', (done: DoneFn) => {
    const fieldFromGroup = component.form;
    const fieldFormValues = {
      name: '',
      isAvailable: '',
    };
    expect(fieldFromGroup.value).toEqual(fieldFormValues);
    done();
  });

  it('should check if formControls required validation is correct', (done: DoneFn) => {
    const inputElements: HTMLInputElement[] = fixture.debugElement.nativeElement
      .querySelector('form')
      .querySelectorAll('input');
    const fieldNameInputElement = inputElements[0];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const fieldNameValue = component.form.get('name');
      expect(fieldNameInputElement.value).toEqual(fieldNameValue?.value);
      expect(fieldNameValue?.errors).not.toBeNull();
      done();
    });
  });

  // TODO: Check this for a fix - For David 
  it('should check if form is valid', (done: DoneFn) => {
    const inputElements: HTMLInputElement[] = fixture.debugElement.nativeElement
      .querySelector('form')
      .querySelectorAll('input');
    const fieldNameInputElement = inputElements[0];
    fieldNameInputElement.value = 'Zaal 1';
    const fieldAvailabilityInputElement = inputElements[1];
    fieldNameInputElement.dispatchEvent(new Event('input'));
    dispatchEvent(new Event('click'))
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      console.warn(
        component.form.get('name')?.value,
        component.form.get('isAvailable')?.value
      );
      console.warn(
        fieldNameInputElement.value,
        fieldAvailabilityInputElement.value
      );
      const isFormValid = component.form.valid;
      expect(isFormValid).toBeTruthy();
      done();
    });
  });
});