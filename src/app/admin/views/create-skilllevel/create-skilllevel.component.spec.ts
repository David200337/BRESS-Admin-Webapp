import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateSkilllevelComponent } from './create-skilllevel.component';

describe('CreateSkilllevelComponent', () => {
  let component: CreateSkilllevelComponent;
  let fixture: ComponentFixture<CreateSkilllevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule, RouterTestingModule],
      providers: [FormBuilder],
      declarations: [CreateSkilllevelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSkilllevelComponent);
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
    const skilllevelFromGroup = component.form;
    const skilllevelFormValues = {
      name: '',
    };

    expect(skilllevelFromGroup.value).toEqual(skilllevelFormValues);
  });

  it('should check if formControls required validation is correct', () => {
    const inputElements: HTMLInputElement[] = fixture.debugElement.nativeElement
      .querySelector('form')
      .querySelectorAll('input');
    const categoryNameInputElement: HTMLInputElement = inputElements[0];
    const categoryNameValue = component.form.get('name');
    expect(categoryNameInputElement.value).toEqual(categoryNameValue?.value);
    expect(categoryNameValue?.errors).not.toBeNull();
    expect(categoryNameValue?.errors!['required']).toBeTruthy();
  });

  it('should check if the form is valid', (done: DoneFn) => {
    const inputElements: HTMLInputElement[] = fixture.debugElement.nativeElement
      .querySelector('form')
      .querySelectorAll('input');

    const categoryNameInputElement = inputElements[0];
    categoryNameInputElement.value = 'Gevorderd';
    categoryNameInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges()
    const isFormValid = component.form.valid;
    fixture.whenStable().then(() => {
      expect(isFormValid).toBeTruthy();
      done();
    });
  });
});
