import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexGenerosComponent } from './index-generos.component';

describe('IndexGenerosComponent', () => {
  let component: IndexGenerosComponent;
  let fixture: ComponentFixture<IndexGenerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexGenerosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexGenerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
