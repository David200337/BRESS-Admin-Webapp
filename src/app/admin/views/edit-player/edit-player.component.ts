import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Player } from "src/app/models/player.model";
import { LoaderToggleService } from "src/app/services/loader-toggle.service";
import { PlayerService } from "src/app/services/player.service";

@Component({
	selector: "app-edit-player",
	templateUrl: "./edit-player.component.html",
	styleUrls: ["./edit-player.component.scss"]
})
export class EditPlayerComponent implements OnInit {
	private playerId: number | undefined = undefined;
	private player: Player | undefined = undefined;
	private sub!: Subscription;
	private form!: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private playerService: PlayerService,
		private formBuilder: FormBuilder,
		private datePipe: DatePipe,
		private loaderToggle: LoaderToggleService
	) {
		loaderToggle.loaderVisible();
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe((paramMap: ParamMap) => {
			this.playerId = Number.parseInt(paramMap.get("id")!);
		});

		this.form = this.formBuilder.group({
			name: ["", Validators.required],
			email: ["", Validators.required],
			skillLevel: ["", Validators.required]
		});

        if (this.playerId) {
            this.sub = this.playerService.get(this.playerId).subscribe({
                next: (response: any) => {
                    this.player = response.result;
                    this.form.setValue({
                        name: this.player?.name,
                        email: this.player?.email,
                        skillLevel: this.player?.skillLevel
                    })

                    this.loaderToggle.loaderInvisible();
                },
                error: (err) => {
                    console.log(err);
                    this.loaderToggle.loaderInvisible()
                }
            })
        }
	}

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    onSubmit(): void {
        if (this.player && this.form.valid) {
            console.log(JSON.stringify(this.player));
        }
    }
}
