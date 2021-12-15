import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolGamesItemComponent } from './pool-games-item.component';

describe('PoolGamesItemComponent', () => {
  let component: PoolGamesItemComponent;
  let fixture: ComponentFixture<PoolGamesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolGamesItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolGamesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
