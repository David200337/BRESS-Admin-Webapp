import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pool-detail',
  templateUrl: './pool-detail.component.html',
  styleUrls: ['./pool-detail.component.scss']
})
export class PoolDetailComponent implements OnInit {
  /**
   * @todo Implement domain model
   */
  tournament: String = "Speeltoernooi beginners"
  poolName:String = "Poule A"

  constructor() { }

  ngOnInit(): void {
  }

}
