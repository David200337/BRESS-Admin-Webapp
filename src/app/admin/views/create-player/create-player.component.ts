import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Player } from "src/app/models/player.model";
import { SkillLevel } from "src/app/models/skillLevel.model";
import { LoaderToggleService } from "src/app/services/loader-toggle.service";
import { PlayerService } from "src/app/services/player.service";

@Component({
	selector: "app-create-player",
	templateUrl: "./create-player.component.html",
	styleUrls: ["./create-player.component.scss"]
})
export class CreatePlayerComponent implements OnInit {
	public form!: FormGroup;
	public skillLevels!: SkillLevel[];
	public selectedSkillLevel: string = "";

	constructor(
		private router: Router,
		private playerService: PlayerService,
		private formBuilder: FormBuilder,
		private loaderToggle: LoaderToggleService
	) {}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			name: ["", Validators.required],
			email: ["", Validators.required],
			skillLevel: ["", Validators.required]
		});

		this.skillLevels = [
			new SkillLevel(0, "Beginner"),
			new SkillLevel(1, "Half-Gevorderden"),
			new SkillLevel(2, "Gevorderden")
		];
	}

	changeSkillLevel(e: any) {
		let skillLevelName = e.target!.value.split(" ")[1];
		let selectedSkillLevel = this.skillLevels.filter(
			(skillLevel) => skillLevel.name === skillLevelName
		);

		this.selectedSkillLevel = skillLevelName;

		this.form.patchValue({
			skillLevel: selectedSkillLevel
		});
	}

	onSubmit(): void {
		if (this.form.valid) {
			this.loaderToggle.loaderVisible();
			const player = new Player(
				-1,
				this.form.value.name,
				this.form.value.email,
				0,
				this.form.value.skillLevel
			);

			this.playerService.add(player).subscribe({
				next: (res) => {
					console.log("RESPONSE: " + JSON.stringify(res));
					this.router.navigate(["dashboard"]);
				},
				error: (err) => {
					console.log(err);
					this.loaderToggle.loaderInvisible();
				}
			});
		} else {
			return;
		}
	}
}
