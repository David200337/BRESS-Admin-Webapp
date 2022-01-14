import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pool } from 'src/app/models/pool.model';

@Component({
  selector: 'app-pool-players-item',
  templateUrl: './pool-players-item.component.html',
  styleUrls: ['./pool-players-item.component.scss']
})
export class PoolPlayersItemComponent implements OnInit {
  @Input() pool!: Pool;
  tournamentId: any;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tournamentId = params['id'];
    });

    this.pool.players.forEach(p => {
      p.score = p.scores.filter(s => {
        console.log(s);
        
        return s.tournament?.id?? 0 == this.tournamentId;
      })[0].score;
    })
  }

}
