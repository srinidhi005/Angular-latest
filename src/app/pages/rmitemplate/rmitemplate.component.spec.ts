import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmitemplateComponent } from './rmitemplate.component';

describe('RmitemplateComponent', () => {
  let component: RmitemplateComponent;
  let fixture: ComponentFixture<RmitemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmitemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmitemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
