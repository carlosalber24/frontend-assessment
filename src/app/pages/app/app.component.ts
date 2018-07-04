import { Component } from '@angular/core';
import { SearchingService } from '../../../providers/searching.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class MainAppComponent {
  public myGlobalList = [];
  public myTableList = [];
  public totalGlobalList: Number;
  public modalContent: any = {};
  public page = 1;
  _modal = null;

  constructor(
    public searchingService: SearchingService
  ) 
  {}

  /**
   * Call initial methods needed to be loaded in the page
   */
  ngOnInit() {
    this.searchingService.getOrcsInfo().subscribe((results) => {
      const orcsList = results.Brastlewark
      if (orcsList.length){
        setTimeout(() => {
          this.myGlobalList = orcsList;
          this.myTableList = orcsList;
          this.totalGlobalList = orcsList.length;
        }, 400);
      }
    });
  }

  /**
   * Bind modal variable to modal element
   * @param {Object} modal
   */
  bindModal(modal) {
    this._modal = modal;
  }

  /**
   * Close modal profile
   */
  close() {
    this._modal.close();
  }

  /**
   * Allow to update the array list when a new search is issued
   * @param {Array} $data
   */
  searchChange($data){
    this.myTableList = $data;
    this.totalGlobalList = this.myTableList.length;
  }

  /**
   * Pop up orc profile modal
   * @param {Array} $data
   */
  open($content) {
    this.modalContent = $content;
    this._modal.open();
  }
}
