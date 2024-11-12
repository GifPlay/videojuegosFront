import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexConsolasComponent } from './index-consolas.component';

describe('IndexConsolasComponent', () => {
  let component: IndexConsolasComponent;
  let fixture: ComponentFixture<IndexConsolasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexConsolasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexConsolasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
