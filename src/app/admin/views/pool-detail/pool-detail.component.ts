import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concat, Observable, tap } from 'rxjs';
import { Pool } from 'src/app/models/pool.model';
import { Tournament } from 'src/app/models/tournament.model';
import { EditGameService } from 'src/app/services/edit-game.service';
import { LoaderToggleService } from 'src/app/services/loader-toggle.service';
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
  poolName: String = "Poule A"
  tournamentId: any;
  poolId: any;
  pool$!: Observable<Pool>;
  categoryId: any;
  tournament!: Tournament;

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    public editGame: EditGameService,
    public toggleLoader: LoaderToggleService
  ) {
    editGame.hideEdit();
    toggleLoader.loaderVisible();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tournamentId = params['id'];
      this.poolId = params['poolId'];
      this.categoryId = params['categoryId'];
      this.editGame.tournamentId = params['id'];
    });
    
    this.tournamentService.get(this.tournamentId)
        .subscribe(res => {
          if (this.pool$) {
            this.toggleLoader.loaderInvisible()
          }
          return this.tournament = res;
        })

    this.pool$ = this.tournamentService.getPool(this.tournamentId, this.categoryId, this.poolId)
      .pipe(tap(() => {
        if (this.tournament) {
          this.toggleLoader.loaderInvisible()
        }
      }))
  }

  hideGameEdit() {
    this.editGame.hideEdit();
  }

  onClick(id: number) {
    this.editGame.showEdit(id);
  }
}
