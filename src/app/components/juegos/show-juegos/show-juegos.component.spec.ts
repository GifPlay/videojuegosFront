import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowJuegosComponent } from './show-juegos.component';

describe('ShowJuegosComponent', () => {
  let component: ShowJuegosComponent;
  let fixture: ComponentFixture<ShowJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowJuegosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
