import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Pool } from 'src/app/models/pool.model';
import { LoaderToggleService } from 'src/app/services/loader-toggle.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.scss']
})
export class TournamentDetailComponent implements OnInit, OnDestroy {
  categoryList!: Category[];
  categorySubscription!: Subscription;
  pools! : Observable<Pool[]>;
  tournamentId!: number;
  categoryId!: number;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    ) { 
    private loaderToggle: LoaderToggleService
  ) {
    loaderToggle.loaderVisible();
    this.categoryList = new Array();
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tournamentId = params['id'];
    });
    
    this.categorySubscription = this.tournamentService.getAllCategories(this.tournamentId)
        .pipe(tap(c => console.info(c)))
        .subscribe(c => {
        this.categoryList = c;
        this.loaderToggle.loaderInvisible();
      });

    this.pools = this.tournamentService.getAllPools(this.tournamentId, 1)
        .pipe(tap(pools => console.info(pools)));
  }

  /**
   * @method switchCategory
   * @param category The category selected by the user
   * Display the tournament info for the selected category
   */
  switchCategory(category: Category) {
    this.pools = this.tournamentService.getAllPools(this.tournamentId, category.id);
    this.categoryId = category.id;
  }
}
