import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegimesComponent } from './regimes.component';

describe('RegimesComponent', () => {
  let component: RegimesComponent;
  let fixture: ComponentFixture<RegimesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegimesComponent]
    });
    fixture = TestBed.createComponent(RegimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
