import { Component, OnInit } from "@angular/core";
import { Player } from "src/app/models/player.model";
import { PlayerService } from "src/app/services/player.service";

@Component({
	selector: "app-player-list",
	templateUrl: "./player-list.component.html",
	styleUrls: ["./player-list.component.scss"]
})
export class PlayerListComponent implements OnInit {
	public players!: Player[];


	constructor(private playerService: PlayerService) {}

	ngOnInit(): void {
		this.loadPlayers();
	}

	public loadPlayers(): void {
		this.playerService.getList().subscribe({
			next: (players) => {
				this.players = players;
			},
			error: (err) => {
				// TODO: Handle error
				console.log(err);
			}
		});
	}

	public applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		// this.dataSource.filter = filterValue.trim().toLowerCase();

		// if (this.dataSource.paginator) {
		// 	this.dataSource.paginator.firstPage();
		// }
	}

	public onDelete(id: number): void {
		this.playerService.delete(id).subscribe({
			next: (res) => {
				if (res.result === "Success") {
                    this.players = this.players.filter((p) => p.id !== id);
					alert("Speler successvol verwijderd.");
				}
			},
			error: (err) => {
				// TODO: Handle error
				console.log(err);
			}
		});
	}
}
