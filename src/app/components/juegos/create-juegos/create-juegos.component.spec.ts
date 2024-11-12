import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJuegosComponent } from './create-juegos.component';

describe('CreateJuegosComponent', () => {
  let component: CreateJuegosComponent;
  let fixture: ComponentFixture<CreateJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateJuegosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
