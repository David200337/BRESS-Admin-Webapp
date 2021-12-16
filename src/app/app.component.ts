import { Component } from '@angular/core';
import { Tournament } from './shared/tournament-bracket/declarations/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'bress-admin-webapp';

  myTournamentData: Tournament = {
    rounds: [
      {
        type: 'Winnerbracket',
        matches: [
          {
            teams: [
              { name: 'Robin Schellius', score: 1 },
              { name: 'Robin Schellius', score: 2 },
            ],
          },
          {
            teams: [
              { name: 'Robin Schellius', score: 1 },
              { name: 'Robin Schellius', score: 2 },
            ],
          },
          {
            teams: [
              { name: 'Robin Schellius', score: 1 },
              { name: 'Robin Schellius', score: 2 },
            ],
          },
          {
            teams: [
              { name: 'Robin Schellius', score: 1 },
              { name: 'Robin Schellius', score: 2 },
            ],
          },
          {
            teams: [
              { name: 'Robin Schellius', score: 1 },
              { name: 'Robin Schellius', score: 2 },
            ],
          },
          {
            teams: [
              { name: 'Robin Schellius', score: 1 },
              { name: 'Robin Schellius', score: 2 },
            ],
          },
          {
            teams: [
              { name: 'Robin Schellius', score: 1 },
              { name: 'Robin Schellius', score: 2 },
            ],
          },
          {
            teams: [
              { name: 'Robin Schellius', score: 1 },
              { name: 'Robin Schellius', score: 2 },
            ],
          },
        ],
      },
      {
        type: 'Winnerbracket',
        matches: [
          {
            teams: [
              { name: 'Robin Schellius', score: 1 },
              { name: 'Robin Schellius', score: 2 },
            ],
          },
          {
            teams: [
              { name: 'Robin Schellius', score: 1 },
              { name: 'Robin Schellius', score: 2 },
            ],
          },
          {
            teams: [
              { name: 'Robin Schellius', score: 1 },
              { name: 'Robin Schellius', score: 2 },
            ],
          },
          {
            teams: [
              { name: 'Robin Schellius', score: 1 },
              { name: 'Robin Schellius', score: 2 },
            ],
          },
        ],
      },
      {
        type: 'Winnerbracket',
        matches: [
          {
            teams: [
              { name: 'Robin Schellius', score: 1 },
              { name: 'Robin Schellius', score: 2 },
            ],
          },
          {
            teams: [
              { name: 'Robin Schellius', score: 1 },
              { name: 'Robin Schellius', score: 2 },
            ],
          },
        ],
      },
      {
        type: 'Final',
        matches: [
          {
            teams: [
              { name: 'Robin Schellius', score: 1 },
              { name: 'Robin Schellius', score: 2 },
            ],
          },
        ],
      },
    ],
  };
}
