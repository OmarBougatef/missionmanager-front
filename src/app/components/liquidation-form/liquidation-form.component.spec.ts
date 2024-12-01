import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidationFormComponent } from './liquidation-form.component';

describe('LiquidationFormComponent', () => {
  let component: LiquidationFormComponent;
  let fixture: ComponentFixture<LiquidationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiquidationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiquidationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
