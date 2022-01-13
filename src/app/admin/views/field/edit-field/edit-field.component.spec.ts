import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { EditFieldComponent } from "./edit-field.component";

describe("EditFieldComponent", () => {
	let component: EditFieldComponent;
	let fixture: ComponentFixture<EditFieldComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				HttpClientModule,
				RouterTestingModule,
				ReactiveFormsModule
			],
			providers: [FormBuilder],
			declarations: [EditFieldComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(EditFieldComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should contain the same number of ui input elements as reactiveFormControls", (done: DoneFn) => {
		const formElement =
			fixture.debugElement.nativeElement.querySelector("form");
		const inputElements = formElement.querySelectorAll("input");

		expect(inputElements.length).toEqual(2);
		done();
	});

	it("should check if formGroup is correct", (done: DoneFn) => {
		const fieldFromGroup = component.form;
		const fieldFormValues = {
			name: "",
			isAvailable: ""
		};

		expect(fieldFromGroup.value).toEqual(fieldFormValues);
		done();
	});

	it("should check if formControls required validation is correct", (done: DoneFn) => {
		const inputElements: HTMLInputElement[] =
			fixture.debugElement.nativeElement
				.querySelector("form")
				.querySelectorAll("input");
		const fieldNameInputElement = inputElements[0];
		fixture.detectChanges();
		fixture.whenStable().then(() => {
			const fieldNameValue = component.form.get("name");
			expect(fieldNameInputElement.value).toEqual(fieldNameValue?.value);
			expect(fieldNameValue?.errors).not.toBeNull();
			done();
		});
	});

	it("should check if form is valid", (done: DoneFn) => {
		const inputElements: HTMLInputElement[] =
			fixture.debugElement.nativeElement
				.querySelector("form")
				.querySelectorAll("input");

		const fieldNameInputElement = inputElements[0];
		fieldNameInputElement.value = "Zaal 1";
		fieldNameInputElement.dispatchEvent(new Event("input"));

		component.form.controls["isAvailable"].setValue("on");

		fixture.detectChanges();
		fixture.whenStable().then(() => {
			const isFormValid = component.form.valid;

			expect(isFormValid).toBeTruthy();
			done();
		});
	});
});
