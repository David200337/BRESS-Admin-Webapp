import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { EditGameService } from 'src/app/services/edit-game.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  @Input() match: any

  constructor(private editGameService: EditGameService) { }

  ngOnInit(): void {
  }

  onClick(id: number) {
    this.editGameService.showEdit(id);
  }

}
