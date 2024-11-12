import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexJuegosComponent } from './index-juegos.component';

describe('IndexJuegosComponent', () => {
  let component: IndexJuegosComponent;
  let fixture: ComponentFixture<IndexJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexJuegosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
