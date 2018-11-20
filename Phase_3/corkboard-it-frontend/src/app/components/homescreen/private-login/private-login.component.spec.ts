import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateLoginComponent } from './private-login.component';

describe('PrivateLoginComponent', () => {
  let component: PrivateLoginComponent;
  let fixture: ComponentFixture<PrivateLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
