import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Player } from "src/app/models/player.model";
import { SkillLevel } from "src/app/models/skillLevel.model";
import { LoaderToggleService } from "src/app/services/loader-toggle.service";
import { PlayerService } from "src/app/services/player.service";
import { SkillLevelService } from "src/app/services/skill-level.service";

@Component({
	selector: "app-edit-player",
	templateUrl: "./edit-player.component.html",
	styleUrls: ["./edit-player.component.scss"]
})
export class EditPlayerComponent implements OnInit {
	private playerId: number | undefined = undefined;
	private player: Player | undefined = undefined;
	private sub!: Subscription;
	public form!: FormGroup;
	public skillLevels!: SkillLevel[];
	public selectedSkillLevel: SkillLevel = new SkillLevel(-1, "");

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private playerService: PlayerService,
		private formBuilder: FormBuilder,
		private datePipe: DatePipe,
		private loaderToggle: LoaderToggleService,
		private skillLevelService: SkillLevelService
	) {
		loaderToggle.loaderVisible();
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe((paramMap: ParamMap) => {
			this.playerId = Number.parseInt(paramMap.get("id")!);
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

		this.form = this.formBuilder.group({
			name: ["", Validators.required],
			email: ["", Validators.required],
			skillLevel: ["", Validators.required]
		});

		if (this.playerId) {
			this.sub = this.playerService.get(this.playerId).subscribe({
				next: (response: any) => {
					this.player = response;
					console.log(this.player);

					if (this.player?.skillLevel) {
						this.form.setValue({
							name: this.player?.firstName,
							email: this.player?.email,
							skillLevel: this.player?.skillLevel
						});

						this.selectedSkillLevel = this.player?.skillLevel;
					}

					this.loaderToggle.loaderInvisible();
				},
				error: (err) => {
					console.log(err);
					this.loaderToggle.loaderInvisible();
				}
			});
		}
	}

	changeSkillLevel(e: any) {
		let skillLevelName = e.target!.value.split(" ")[1];
		let selectedSkillLevel = this.skillLevels.filter(
			(skillLevel) => skillLevel.name === skillLevelName
		);

		this.selectedSkillLevel = selectedSkillLevel[0];
	}

	ngOnDestroy(): void {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}

	onSubmit(): void {
		if (
			this.playerId &&
			this.form.valid &&
			this.player &&
			this.selectedSkillLevel.id !== -1
		) {
			const updatedPlayer = new Player(
				this.playerId,
				this.form.value.name.split(' ')[0],
				this.form.value.name.split(' ')[1],
				this.form.value.email,
				this.player.scores,
				this.selectedSkillLevel
			);

			this.playerService.update(this.playerId, updatedPlayer).subscribe({
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
