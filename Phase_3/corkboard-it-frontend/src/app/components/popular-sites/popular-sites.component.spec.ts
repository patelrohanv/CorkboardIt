import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularSitesComponent } from './popular-sites.component';

describe('PopularSitesComponent', () => {
  let component: PopularSitesComponent;
  let fixture: ComponentFixture<PopularSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
