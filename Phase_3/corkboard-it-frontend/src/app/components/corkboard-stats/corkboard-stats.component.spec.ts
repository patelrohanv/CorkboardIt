import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorkboardStatsComponent } from './corkboard-stats.component';

describe('CorkboardStatsComponent', () => {
  let component: CorkboardStatsComponent;
  let fixture: ComponentFixture<CorkboardStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorkboardStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorkboardStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
