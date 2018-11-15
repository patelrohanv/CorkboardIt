import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorkboardTileComponent } from './corkboard-tile.component';

describe('CorkboardTileComponent', () => {
  let component: CorkboardTileComponent;
  let fixture: ComponentFixture<CorkboardTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorkboardTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorkboardTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
