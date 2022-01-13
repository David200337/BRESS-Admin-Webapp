import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";

import { CreatePlayerComponent } from "./create-player.component";

describe("CreatePlayerComponent", () => {
	let component: CreatePlayerComponent;
	let fixture: ComponentFixture<CreatePlayerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				HttpClientModule,
				ReactiveFormsModule,
				RouterTestingModule
			],
			providers: [FormBuilder],
			declarations: [CreatePlayerComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CreatePlayerComponent);
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

		expect(inputElements.length).toEqual(2);
		expect(selectElements.length).toEqual(1);
	});

	it("should check if formGroup is correct", () => {
		const playerFromGroup = component.form;
		const playerFormValues = {
			name: "",
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

		const playerNameInputElement: HTMLInputElement = inputElements[0];
		const playerNameValue = component.form.get("name");
		expect(playerNameInputElement.value).toEqual(playerNameValue?.value);
		expect(playerNameValue?.errors).not.toBeNull();
		expect(playerNameValue?.errors).toBeTruthy();

		const playerEmailInputElement: HTMLInputElement = inputElements[1];
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
