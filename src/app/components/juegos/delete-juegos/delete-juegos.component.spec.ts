import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteJuegosComponent } from './delete-juegos.component';

describe('DeleteJuegosComponent', () => {
  let component: DeleteJuegosComponent;
  let fixture: ComponentFixture<DeleteJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteJuegosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
