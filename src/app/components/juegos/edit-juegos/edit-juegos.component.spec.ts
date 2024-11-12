import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJuegosComponent } from './edit-juegos.component';

describe('EditJuegosComponent', () => {
  let component: EditJuegosComponent;
  let fixture: ComponentFixture<EditJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditJuegosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
