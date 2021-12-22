import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap, tap } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.scss']
})
export class TournamentDetailComponent implements OnInit, OnDestroy{
  categoryList!: Category[];
  categorySubscription!: Subscription;

  constructor(private tournamentService: TournamentService) { 
    this.categoryList = new Array();
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.categorySubscription = this.tournamentService.getAllCategories(1)
        .pipe(tap(c => console.info(c)))
        .subscribe(c => this.categoryList = c);
  }

  /**
   * @method switchCategory
   * @param category The category selected by the user
   * Display the tournament info for the selected category
   */
  switchCategory(category: Category) {
    console.warn(`Method not implemented. \n@param category: ${JSON.stringify(category)}`);
  }
}
