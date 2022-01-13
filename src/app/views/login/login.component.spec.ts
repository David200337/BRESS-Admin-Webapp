import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule, RouterTestingModule],
      providers: [FormBuilder],
      declarations: [ LoginComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
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

    expect(inputElements.length).toEqual(2);
  });

  it('should check if formGroup is correct', () => {
    const userLoginFromGroup = component.form;
    const userLoginFormValues = {
      email: '',
      password: '',
    };

    expect(userLoginFromGroup.value).toEqual(userLoginFormValues);
  });

  it('should check if formControls required validation is correct', () => {
    const inputElements: HTMLInputElement[] = fixture.debugElement.nativeElement
      .querySelector('form')
      .querySelectorAll('input');

    const userEmailInputElement: HTMLInputElement = inputElements[0];
    const userEmailValue = component.form.get('email');
    expect(userEmailInputElement.value).toEqual(userEmailValue?.value);
    expect(userEmailValue?.errors).not.toBeNull();
    expect(userEmailValue?.errors!['required']).toBeTruthy();

    const userPasswordInputElement: HTMLInputElement = inputElements[1];
    const userPasswordValue = component.form.get('password');
    expect(userPasswordInputElement.value).toEqual(userPasswordValue?.value);
    expect(userPasswordValue?.errors).not.toBeNull();
    expect(userPasswordValue?.errors!['required']).toBeTruthy();
  });

  it('should check if the form is valid', (done: DoneFn) => {
    const inputElements: HTMLInputElement[] = fixture.debugElement.nativeElement
      .querySelector('form')
      .querySelectorAll('input');

    const userEmailInputElement = inputElements[0];
    const userPasswordInputElement = inputElements[1];
    userEmailInputElement.value = 'account@mail.com';
    userPasswordInputElement.value = 'supersecret123';
    userEmailInputElement.dispatchEvent(new Event('input'));
    userPasswordInputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    const isFormValid = component.form.valid;
    fixture.whenStable().then(() => {
      expect(isFormValid).toBeTruthy();
      done();
    });
  });
});
