import { Component, Input, OnInit } from '@angular/core';
import { Pool } from 'src/app/models/pool.model';

@Component({
  selector: 'app-pool-players-item',
  templateUrl: './pool-players-item.component.html',
  styleUrls: ['./pool-players-item.component.scss']
})
export class PoolPlayersItemComponent implements OnInit {
  @Input() pool!: Pool;

  constructor() { }

  ngOnInit(): void {
  }

}
