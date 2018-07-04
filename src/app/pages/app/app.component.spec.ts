import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { MainAppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchingService } from '../../../providers/searching.service';

describe('AppComponent', () => {
  let component: MainAppComponent;
  let fixture: ComponentFixture<MainAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxPaginationModule,
        HttpClientModule
      ],
      declarations: [
        MainAppComponent
      ],
      providers: [
        SearchingService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MainAppComponent);
    component = fixture.componentInstance;
  }));
  
  it('should table page be initialized in 1', async(() => {
    const currentPage = component.page;
    expect(currentPage).toEqual(1);
  }));
});
