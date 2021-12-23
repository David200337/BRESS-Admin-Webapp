import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Player } from "src/app/models/player.model";
import { LoaderToggleService } from "src/app/services/loader-toggle.service";
import { PlayerService } from "src/app/services/player.service";

@Component({
	selector: "app-create-player",
	templateUrl: "./create-player.component.html",
	styleUrls: ["./create-player.component.scss"]
})
export class CreatePlayerComponent implements OnInit {
	form!: FormGroup;

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

            console.log(JSON.stringify(player));

            this.playerService.add(player).subscribe({
                next: (res) => {
                    console.log(res);
                    this.router.navigate(["dashboard"]);
                },
                error: (err) => {
                    console.log(err);
                    this.loaderToggle.loaderInvisible();
                }
            })
		} else {
			return;
		}
	}
}
