import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EditGameService } from 'src/app/services/edit-game.service';
import { LoaderToggleService } from 'src/app/services/loader-toggle.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.scss']
})
export class EditGameComponent implements OnInit {
  @Output() sumbitEvent = new EventEmitter<any>();
  playerScores!: number[][]

  constructor(
    private editGame: EditGameService,
    private toggleLoader: LoaderToggleService
  ) {}

  ngOnInit(): void {
  }

  onSubmit() {
    this.toggleLoader.loaderVisible();

    let score: boolean[] = [];

    for (let i = 0; i < this.playerScores[0].length; i++) {
      if (this.playerScores[0][i] === 1) {
        score[i] = true;
      }
    }

    for (let i = 0; i < this.playerScores[1].length; i++) {
      if (this.playerScores[1][i] === 1) {
        score[i] = false;
      }
    }
    console.log(score);
    this.editGame.enterScore(score).subscribe((res) => {
      console.log(res);

      this.sumbitEvent.emit({ id: this.editGame.gameId, score: score });
    });

    this.playerScores = [[0, 0, 0], [0, 0, 0]];
  }

  close() {
    this.editGame.hideEdit();
  }
}
