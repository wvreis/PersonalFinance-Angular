import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInputComponent } from './general-input.component';

describe('InputComponent', () => {
  let component: GeneralInputComponent;
  let fixture: ComponentFixture<GeneralInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralInputComponent]
    });
    fixture = TestBed.createComponent(GeneralInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
