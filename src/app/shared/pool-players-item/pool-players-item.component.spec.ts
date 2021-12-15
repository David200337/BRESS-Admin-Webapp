import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolPlayersItemComponent } from './pool-players-item.component';

describe('PoolItemComponent', () => {
  let component: PoolPlayersItemComponent;
  let fixture: ComponentFixture<PoolPlayersItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolPlayersItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolPlayersItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
