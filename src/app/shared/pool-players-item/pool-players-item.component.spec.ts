import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Player } from 'src/app/models/player.model';
import { Pool } from 'src/app/models/pool.model';
import { SkillLevel } from 'src/app/models/skillLevel.model';

import { PoolPlayersItemComponent } from './pool-players-item.component';

describe('PoolPlayersItemComponent', () => {
  let component: PoolPlayersItemComponent;
  let fixture: ComponentFixture<PoolPlayersItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ PoolPlayersItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    const pool = new Pool(-1, 0, [new Player(-1, "firstName", "lastName", "email", [], new SkillLevel(-1, "skilllevel"))], []);
  });

  it('should create', () => {
    expect(true);
  });
});
