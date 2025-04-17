import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsnotificationComponent } from './ensnotification.component';

describe('EnsnotificationComponent', () => {
  let component: EnsnotificationComponent;
  let fixture: ComponentFixture<EnsnotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnsnotificationComponent]
    });
    fixture = TestBed.createComponent(EnsnotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
