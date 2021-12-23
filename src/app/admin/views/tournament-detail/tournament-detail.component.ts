import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Pool } from 'src/app/models/pool.model';
import { Tournament } from 'src/app/models/tournament.model';
import { LoaderToggleService } from 'src/app/services/loader-toggle.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.scss']
})
export class TournamentDetailComponent implements OnInit {
  categoryList!: Category[];
  categorySubscription!: Subscription;
  pools$! : Observable<Pool[]>;
  tournamentId!: number;
  categoryId!: number;
  tournament!: Tournament;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    private loaderToggle: LoaderToggleService
    ) { 
    loaderToggle.loaderVisible();
    this.categoryList = new Array();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tournamentId = params['id'];
    });

    this.tournamentService.get(this.tournamentId)
      .subscribe((result: any) => {
        console.log(result.result);
        this.tournament = result.result;
        this.categoryList = this.tournament.categories; 
        this.categoryId = this.categoryList[0].id;
        this.pools$ = this.tournamentService.getAllPools(this.tournamentId, this.categoryId);
      })
      .add(() => this.loaderToggle.loaderInvisible());
  }

  /**
   * @method switchCategory
   * @param category The category selected by the user
   * Display the tournament info for the selected category
   */
  switchCategory(category: Category) {
    this.pools$ = this.tournamentService.getAllPools(this.tournamentId, category.id);
    this.categoryId = category.id;
  }
}
