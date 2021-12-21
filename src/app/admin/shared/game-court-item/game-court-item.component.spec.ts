import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCourtItemComponent } from './game-court-item.component';

describe('GameCourtItemComponent', () => {
  let component: GameCourtItemComponent;
  let fixture: ComponentFixture<GameCourtItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameCourtItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCourtItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
