import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPushpinComponent } from './search-pushpin.component';

describe('SearchPushpinComponent', () => {
  let component: SearchPushpinComponent;
  let fixture: ComponentFixture<SearchPushpinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPushpinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPushpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
