import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.scss']
})
export class TournamentDetailComponent implements OnInit {
  categoryList = [new Category(1, "1", []), new Category(2, "2", [])]

  constructor() { }

  ngOnInit(): void {
    
  }

}
