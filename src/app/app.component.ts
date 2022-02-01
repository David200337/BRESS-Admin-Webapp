import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { LoaderToggleService } from './services/loader-toggle.service';
import { TournamentInterface } from './shared/tournament-bracket/declarations/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'bress-admin-webapp';

  constructor(public loaderToggle: LoaderToggleService) { }

  ngOnInit(): void {
  }
}
