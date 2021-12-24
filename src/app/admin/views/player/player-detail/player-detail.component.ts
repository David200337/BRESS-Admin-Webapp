import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Player } from "src/app/models/player.model";
import { PlayerService } from "src/app/services/player.service";

@Component({
	selector: "app-player-detail",
	templateUrl: "./player-detail.component.html",
	styleUrls: ["./player-detail.component.scss"]
})
export class PlayerDetailComponent implements OnInit {
	public playerId!: number;
	public player: Player | null = null;

	constructor(
        private router: Router,
		private route: ActivatedRoute,
		private playerService: PlayerService
	) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
            if (params.get("id")) {
                this.playerId = parseInt(params.get("id")!);
                this.playerService.get(this.playerId).subscribe({
                    next: (player) => {
                        console.log(player);
                        
                        this.player = player
                    },
                    error: (err) => {
                        if (err.status === 404) {
                            this.router.navigate(['..'], { relativeTo: this.route })
                        } else {
                            // TODO: Handle error
                            console.log(err);
                        }
                    }
                })
            }
        })
	}
}
