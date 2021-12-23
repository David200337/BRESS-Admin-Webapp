import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Pool } from 'src/app/models/pool.model';
import { EditGameService } from 'src/app/services/edit-game.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-pool-detail',
  templateUrl: './pool-detail.component.html',
  styleUrls: ['./pool-detail.component.scss']
})
export class PoolDetailComponent implements OnInit {
  gameEditDisplay = "none";
  gameScores: any;

  /**
   * @todo Implement domain model
   */
  tournament: String = "Speeltoernooi beginners"
  poolName: String = "Poule A"
  tournamentId: any;
  poolId: any;
  pool$!: Observable<Pool>;
  categoryId: any;

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    public editGame: EditGameService
  ) { editGame.hideEdit() }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tournamentId = params['id'];
      this.poolId = params['poolId'];
      this.categoryId = params['categoryId'];
      this.editGame.tournamentId = params['id'];
    });

    this.pool$ = this.tournamentService.getPool(this.tournamentId, this.categoryId, this.poolId)
      .pipe(tap(pool => console.info(pool)))
  }

  hideGameEdit() {
    this.editGame.hideEdit();
  }

  onClick(id: number) {
    this.editGame.showEdit(id);
  }
}
