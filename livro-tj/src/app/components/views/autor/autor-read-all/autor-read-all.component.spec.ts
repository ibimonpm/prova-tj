import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorReadAllComponent } from './autor-read-all.component';

describe('AutorReadAllComponent', () => {
  let component: AutorReadAllComponent;
  let fixture: ComponentFixture<AutorReadAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutorReadAllComponent]
    });
    fixture = TestBed.createComponent(AutorReadAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
