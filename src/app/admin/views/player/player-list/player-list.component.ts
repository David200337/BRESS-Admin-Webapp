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
	public searchTerm!: string;
	public tableSizes: number[] = [10, 25, 100];
	public tableSize: number = this.tableSizes[0];
	public page = 1;
	public count = 0;

	constructor(private playerService: PlayerService) {}

	ngOnInit(): void {
		this.loadPlayers();
	}

	public loadPlayers(): void {
		this.playerService.getList().subscribe({
			next: (players) => {
				this.players = players;
				this.count = players.length;
			},
			error: (err) => {
				// TODO: Handle error
				console.log(err);
			}
		});
	}

	public onDelete(id: number): void {
		this.playerService.delete(id).subscribe({
			next: (res) => {
				if (res.result === "Success") {
					this.players = this.players.filter((p) => p.id !== id);
					this.count = this.players.length;
					this.updatePageOnDelete();

					alert("Speler successvol verwijderd.");
				}
			},
			error: (err) => {
				// TODO: Handle error
				console.log(err);
			}
		});
	}

	public onTableDataChange(event: any): void {
		this.page = event;
		this.loadPlayers();
	}

	public onTableSizeChange(event: any): void {
		this.tableSize = event.target.value;
		this.page = 1;
		this.loadPlayers();
	}

	private updatePageOnDelete() {
		if (this.count % this.tableSize === 0) {
			this.page--;
		}
	}
}
