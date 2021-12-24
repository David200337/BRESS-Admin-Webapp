import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Player } from "src/app/models/player.model";
import { SkillLevel } from "src/app/models/skillLevel.model";
import { LoaderToggleService } from "src/app/services/loader-toggle.service";
import { PlayerService } from "src/app/services/player.service";
import { SkillLevelService } from "src/app/services/skill-level.service";

@Component({
	selector: "app-create-player",
	templateUrl: "./create-player.component.html",
	styleUrls: ["./create-player.component.scss"]
})
export class CreatePlayerComponent implements OnInit {
	public form!: FormGroup;
	public skillLevels!: SkillLevel[];
	public selectedSkillLevel: SkillLevel = new SkillLevel(-1, "");

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private playerService: PlayerService,
		private formBuilder: FormBuilder,
		private loaderToggle: LoaderToggleService,
		private skillLevelService: SkillLevelService
	) {}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			name: ["", Validators.required],
			email: ["", Validators.required],
			skillLevel: ["", Validators.required]
		});

		this.skillLevelService.getList().subscribe({
			next: (skillLevels) => {
				this.skillLevels = skillLevels;
			},
			error: (err) => {
				// TODO: Handle error
				console.log(err);
			}
		});
	}

	changeSkillLevel(e: any) {
		let skillLevelName = e.target!.value.split(" ")[1];
		let selectedSkillLevel = this.skillLevels.filter(
			(skillLevel) => skillLevel.name === skillLevelName
		);

		this.selectedSkillLevel = selectedSkillLevel[0];
	}

	onSubmit(): void {
		if (this.form.valid && this.selectedSkillLevel.id !== -1) {
			this.loaderToggle.loaderVisible();
			const player = new Player(
				-1,
				this.form.value.name,
				this.form.value.email,
				0,
				this.selectedSkillLevel
			);

			this.playerService.add(player).subscribe({
				next: (res) => {
					this.loaderToggle.loaderInvisible();
					this.router.navigate([".."], { relativeTo: this.route });
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
