import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPushpinComponent } from './view-pushpin.component';

describe('ViewPushpinComponent', () => {
  let component: ViewPushpinComponent;
  let fixture: ComponentFixture<ViewPushpinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPushpinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPushpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
