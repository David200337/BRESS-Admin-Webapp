import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentItemComponent } from './tournament-item.component';

describe('TournamentItemComponent', () => {
  let component: TournamentItemComponent;
  let fixture: ComponentFixture<TournamentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
