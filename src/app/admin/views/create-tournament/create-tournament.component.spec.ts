import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";

import { CreateTournamentComponent } from "./create-tournament.component";

describe("CreateTournamentComponent", () => {
	let component: CreateTournamentComponent;
	let fixture: ComponentFixture<CreateTournamentComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				HttpClientModule,
				ReactiveFormsModule,
				RouterTestingModule
			],
			providers: [FormBuilder],
			declarations: [CreateTournamentComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CreateTournamentComponent);
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

		expect(inputElements.length).toEqual(4);
	});

	it("should check if formGroup is correct", () => {
		const playerFromGroup = component.form;
		const playerFormValues = {
			title: "",
			beginDateTime: "",
            maxPlayers: "",
            entryFee: ""
		};

		expect(playerFromGroup.value).toEqual(playerFormValues);
	});

	it("should check if formControls required validation is correct", () => {
		const inputElements: HTMLInputElement[] =
			fixture.debugElement.nativeElement
				.querySelector("form")
				.querySelectorAll("input");

		const tournamentTitleInputElement: HTMLInputElement = inputElements[0];
		const tournamentTitleValue = component.form.get("title");
		expect(tournamentTitleInputElement.value).toEqual(tournamentTitleValue?.value);
		expect(tournamentTitleValue?.errors).not.toBeNull();
		expect(tournamentTitleValue?.errors).toBeTruthy();

		const tournamentDateInputElement: HTMLInputElement = inputElements[1];
		const tournamentDateValue = component.form.get("beginDateTime");
		expect(tournamentDateInputElement.value).toEqual(tournamentDateValue?.value);
		expect(tournamentDateValue?.errors).not.toBeNull();
		expect(tournamentDateValue?.errors).toBeTruthy();

        const tournamentMaxPlayersInputElement: HTMLInputElement = inputElements[2];
		const tournamentMaxPlayersValue = component.form.get("maxPlayers");
		expect(tournamentMaxPlayersInputElement.value).toEqual(tournamentMaxPlayersValue?.value);
		expect(tournamentMaxPlayersValue?.errors).not.toBeNull();
		expect(tournamentMaxPlayersValue?.errors).toBeTruthy();

        const tournamentEntryFeeInputElement: HTMLInputElement = inputElements[3];
		const tournamentEntryFeeValue = component.form.get("entryFee");
		expect(tournamentEntryFeeInputElement.value).toEqual(tournamentEntryFeeValue?.value);
		expect(tournamentEntryFeeValue?.errors).not.toBeNull();
		expect(tournamentEntryFeeValue?.errors).toBeTruthy();
	});

	it("should check if the form is valid", () => {
		const inputElements: HTMLInputElement[] =
			fixture.debugElement.nativeElement
				.querySelector("form")
				.querySelectorAll("input");

		const tournamentTitleInputElement = inputElements[0];
		tournamentTitleInputElement.value = "Toernooi";
		tournamentTitleInputElement.dispatchEvent(new Event("input"));

		const tournamentDateInputElement = inputElements[1];
        const currentDate = new Date();
		tournamentDateInputElement.value = currentDate.toISOString().split('T')[0];
		tournamentDateInputElement.dispatchEvent(new Event("input"));

        const tournamentMaxPlayersInputElement = inputElements[2];
		tournamentMaxPlayersInputElement.value = "32";
		tournamentMaxPlayersInputElement.dispatchEvent(new Event("input"));

        const tournamentEntryFeeInputElement = inputElements[3];
		tournamentEntryFeeInputElement.value = "1";
		tournamentEntryFeeInputElement.dispatchEvent(new Event("input"));
	});
});
