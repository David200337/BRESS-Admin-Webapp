import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Player } from "src/app/models/player.model";
import { PlayerService } from "src/app/services/player.service";

@Component({
	selector: "app-player-list",
	templateUrl: "./player-list.component.html",
	styleUrls: ["./player-list.component.scss"]
})
export class PlayerListComponent implements OnInit {
	public tableColumns = ["name"];
	public dataSource!: MatTableDataSource<Player>;

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	constructor(private playerService: PlayerService) {}

	ngOnInit(): void {
		this.loadPlayers();
	}

	public loadPlayers(): void {
		this.playerService.getList().subscribe({
			next: (players) => {
				this.dataSource = new MatTableDataSource(players);
                this.dataSource.paginator = this.paginator;
		        this.dataSource.sort = this.sort;
				console.log(this.dataSource);
			},
			error: (err) => {
				// TODO: Handle error
				console.log(err);
			}
		});
	}

	public applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	public onDelete(id: number): void {
		this.playerService.delete(id).subscribe({
			next: (res) => {
				if (res.result === "Success") {
                    this.dataSource.data = this.dataSource.data.filter((p) => p.id !== id);
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
