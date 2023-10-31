import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorDeleteComponent } from './autor-delete.component';

describe('AutorDeleteComponent', () => {
  let component: AutorDeleteComponent;
  let fixture: ComponentFixture<AutorDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutorDeleteComponent]
    });
    fixture = TestBed.createComponent(AutorDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
