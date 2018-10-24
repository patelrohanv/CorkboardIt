import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCorkboardComponent } from './view-corkboard.component';

describe('ViewCorkboardComponent', () => {
  let component: ViewCorkboardComponent;
  let fixture: ComponentFixture<ViewCorkboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCorkboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCorkboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
