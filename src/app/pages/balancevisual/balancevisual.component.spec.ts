import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancevisualComponent } from './balancevisual.component';

describe('BalancevisualComponent', () => {
  let component: BalancevisualComponent;
  let fixture: ComponentFixture<BalancevisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalancevisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancevisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
