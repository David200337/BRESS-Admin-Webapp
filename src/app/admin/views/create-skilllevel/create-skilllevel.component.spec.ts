import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
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

	it("should contain the same number of ui input elements as reactiveFormControls", () => {
		const formElement =
			fixture.debugElement.nativeElement.querySelector("form");
		const inputElements = formElement.querySelectorAll("input");

		expect(inputElements.length).toEqual(1);
	});

	it("should check if formGroup is correct", () => {
		const playerFromGroup = component.form;
		const playerFormValues = {
			name: "",
		};

		expect(playerFromGroup.value).toEqual(playerFormValues);
	});

	it("should check if formControls required validation is correct", () => {
		const inputElements: HTMLInputElement[] =
			fixture.debugElement.nativeElement
				.querySelector("form")
				.querySelectorAll("input");
		const playerNameInputElement: HTMLInputElement = inputElements[0];
		const playerNameValue = component.form.get("name");
		expect(playerNameInputElement.value).toEqual(playerNameValue?.value);
		expect(playerNameValue?.errors).not.toBeNull();
		expect(playerNameValue?.errors).toBeTruthy();
	});

	it("should check if the form is valid", (done: DoneFn) => {
		const inputElements: HTMLInputElement[] =
			fixture.debugElement.nativeElement
				.querySelector("form")
				.querySelectorAll("input");

		const playerNameInputElement = inputElements[0];
		playerNameInputElement.value = "Speler 1";
		playerNameInputElement.dispatchEvent(new Event("input"));

		fixture.detectChanges();
		fixture.whenStable().then(() => {
			const isFormValid = component.form.valid;
			expect(isFormValid).toBeTruthy;
      done();
		});
	});
});
