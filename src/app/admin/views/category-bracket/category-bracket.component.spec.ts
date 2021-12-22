import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBracketComponent } from './category-bracket.component';

describe('CategoryBracketComponent', () => {
  let component: CategoryBracketComponent;
  let fixture: ComponentFixture<CategoryBracketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryBracketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBracketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
