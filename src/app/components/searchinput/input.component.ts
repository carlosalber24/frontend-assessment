import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class SearchInputComponent {
  model: any;
  @Input() orcsList: Array<any> = [];
  @Output() searchValue: EventEmitter<any> = new EventEmitter<any>();

  constructor(
  ) 
  {
  }

  /**
   * Search method to filter data in the main table
   * @param {Observable<string>} text$
   * @return {Array}
   */
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.orcsList.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  
  /**
   * Format text input value to just display the name property
   * @param {Object} x
   */
  formatter = (x: any) => {
    this.searchValue.emit([x]);
    return x.name
  };

  /**
   * Send the whole array when the input model is empty
   * @param {String} $event
   */
  changeInputValue($event){
    const myText = $event.target.value;
    if (!myText)
      this.searchValue.emit(this.orcsList);
  }
}
