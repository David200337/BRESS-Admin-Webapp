import { DatePipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";

import { EditPlayerComponent } from "./edit-player.component";

describe("EditPlayerComponent", () => {
	let component: EditPlayerComponent;
	let fixture: ComponentFixture<EditPlayerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				HttpClientModule,
				ReactiveFormsModule,
				RouterTestingModule
			],
			providers: [DatePipe],
			declarations: [EditPlayerComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(EditPlayerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

    it("should contain the same number of ui input elements as reactiveFormControls", () => {
		const formElement =
			fixture.debugElement.nativeElement.querySelector("form");
		const inputElements = formElement.querySelectorAll("input");
		const selectElements = formElement.querySelectorAll("select");

		expect(inputElements.length).toEqual(3);
		expect(selectElements.length).toEqual(1);
	});

    it("should check if formGroup is correct", () => {
		const playerFromGroup = component.form;
		const playerFormValues = {
			firstName: "",
            lastName: "",
			email: "",
			skillLevel: ""
		};

		expect(playerFromGroup.value).toEqual(playerFormValues);
	});

    it("should check if formControls required validation is correct", () => {
		const inputElements: HTMLInputElement[] =
			fixture.debugElement.nativeElement
				.querySelector("form")
				.querySelectorAll("input");
		const selectElements: HTMLSelectElement[] =
			fixture.debugElement.nativeElement
				.querySelector("form")
				.querySelectorAll("select");

		const playerFirstNameInputElement: HTMLInputElement = inputElements[0];
		const playerFirstNameValue = component.form.get("firstName");
		expect(playerFirstNameInputElement.value).toEqual(playerFirstNameValue?.value);
		expect(playerFirstNameValue?.errors).not.toBeNull();
		expect(playerFirstNameValue?.errors).toBeTruthy();

		const playerLastNameInputElement: HTMLInputElement = inputElements[1];
		const playerLastNameValue = component.form.get("lastName");
		expect(playerLastNameInputElement.value).toEqual(playerLastNameValue?.value);
		expect(playerLastNameValue?.errors).not.toBeNull();
		expect(playerLastNameValue?.errors).toBeTruthy();

		const playerEmailInputElement: HTMLInputElement = inputElements[2];
		const playerEmailValue = component.form.get("email");
		expect(playerEmailInputElement.value).toEqual(playerEmailValue?.value);
		expect(playerEmailValue?.errors).not.toBeNull();
		expect(playerEmailValue?.errors).toBeTruthy();

		const skillLevelSelectElement: HTMLSelectElement = selectElements[0];
		const skillLevelSelectValue = component.form.get("skillLevel");
		expect(skillLevelSelectElement.value).toEqual(
			skillLevelSelectValue?.value
		);
		expect(skillLevelSelectValue?.errors).not.toBeNull();
		expect(skillLevelSelectValue?.errors).toBeTruthy();
	});

	it("should check if the form is valid", () => {
		const inputElements: HTMLInputElement[] =
			fixture.debugElement.nativeElement
				.querySelector("form")
				.querySelectorAll("input");
		const selectElements: HTMLSelectElement[] =
			fixture.debugElement.nativeElement
				.querySelector("form")
				.querySelectorAll("select");

		const playerNameInputElement = inputElements[0];
		playerNameInputElement.value = "Speler 1";
		playerNameInputElement.dispatchEvent(new Event("input"));

		const playerEmailInputElement = inputElements[1];
		playerEmailInputElement.value = "speler@email.com";
		playerEmailInputElement.dispatchEvent(new Event("input"));

		const skillLevelSelectElement: HTMLSelectElement = selectElements[0];
		skillLevelSelectElement.value = "Beginners";
		skillLevelSelectElement.dispatchEvent(new Event("select"));
		fixture.detectChanges();
		fixture.whenStable().then(() => {
			const isFormValid = component.form.valid;
			expect(isFormValid).toBeTruthy;
		});
	});
});
