import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  showGameEdit() {
    this.gameEditDisplay = "block"
  }

  hideGameEdit() {
    this.gameEditDisplay = "none"
  }

}
