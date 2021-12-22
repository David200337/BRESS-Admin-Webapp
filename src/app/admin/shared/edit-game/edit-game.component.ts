import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EditGameService } from 'src/app/services/edit-game.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.scss']
})
export class EditGameComponent implements OnInit {
  @Output() sumbitEvent = new EventEmitter<void>();
  playerScores!: number[][]

  constructor(
    private editGame: EditGameService) {
    this.playerScores = [[0, 0, 0], [0, 0, 0]]
  }

  ngOnInit(): void {
  }

  toggle(player: number, round: number) {
    this.playerScores[player][round] = Math.abs(this.playerScores[player][round] - 1);
    if (this.playerScores[player].reduce((a, b) => a + b, 0) > 2) {
      this.playerScores[player][round] = 0
    } else {
      if (this.playerScores[Math.abs(player - 1)][round] == 1) {
        this.playerScores[Math.abs(player - 1)][round] = 0
      }
    }
  }

  onSubmit() {
    console.log(this.playerScores)
    let score: boolean[] = [];
    for (let i = 0; i < this.playerScores[0].length; i++) {
      score[i] = this.playerScores[0][i] === 1 ? true : false;
    }
    this.editGame.enterScore(score);
    this.sumbitEvent.emit();
  }

  close() {
    this.editGame.hideEdit();
  }
}
