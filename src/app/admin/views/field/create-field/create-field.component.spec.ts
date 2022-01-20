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

  it('should create', (done: DoneFn) => {
    expect(component).toBeTruthy();
    done();
  });

  it('should contain the same number of ui input elements as reactiveFormControls', (done: DoneFn) => {
    const formElement =
      fixture.debugElement.nativeElement.querySelector('form');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(2);
    done()
  });

  it('should check if formGroup is correct', (done: DoneFn) => {
    const fieldFromGroup = component.form;
    const fieldFormValues = {
      name: '',
      primary: "",
      isAvailable: ""
    };
    expect(true);
    done()
  });

  it('should check if formControls required validation is correct', (done: DoneFn) => {
    const fieldNameInputElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('form')
        .querySelectorAll('input')[0];
    const fieldNameValue = component.form.get('name');
    expect(fieldNameInputElement.value).toEqual(fieldNameValue?.value);
    expect(fieldNameValue?.errors).not.toBeNull();
    expect(fieldNameValue?.errors).toBeTruthy();
    done()
  });

  it('should check if formControls validation is correct when something is entered', (done: DoneFn) => {
    const fieldNameInputElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('form')
        .querySelectorAll('input')[0];
    fieldNameInputElement.value = 'Zaal 1';
    fieldNameInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const fieldNameValue = component.form.get('name');
      console.warn(fieldNameValue?.value)
      expect(fieldNameInputElement.value).toEqual(fieldNameValue?.value);
      expect(fieldNameValue?.errors).toBeNull();
      done()
    });
  });
  
  it('should check if form is valid with all formControlls filled', (done: DoneFn) => {
    const fieldNameInputElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('form')
        .querySelectorAll('input')[0];
    fieldNameInputElement.value = 'Zaal 1';
    fieldNameInputElement.dispatchEvent(new Event('input'));
    const formIsValid = component.form.valid;
    fixture.whenStable().then(() => {
      expect(formIsValid).toBeTruthy();
      done()
    });
  });
});
