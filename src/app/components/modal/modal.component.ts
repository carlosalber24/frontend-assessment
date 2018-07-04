import { Component, Input, Output, ElementRef, EventEmitter, AfterViewInit } from '@angular/core';
declare var $: any; //This is important to leverage the bootstrap js functionalities.

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class MyModalComponent implements AfterViewInit {
  @Input() title: string;
  @Input() showClose: boolean = true;
  @Input() content: any;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  modalEl = null;

  constructor(private _rootNode: ElementRef) {}

  /**
   * Open up the modal
   */
  open() {
    this.modalEl.modal('show');
  }

  /**
   * Close the modal
   */
  close() {
    this.modalEl.modal('hide');
  }

  /**
   * close modal when click on times button in up-right corner
   */
  closeInternal() {
    this.onClose.next(null); // emit event
    this.close();
  }

  /**
   * Allows us to find the modal element to manipulate it
   */
  ngAfterViewInit() {
    this.modalEl = $(this._rootNode.nativeElement).find('div.modal');
  }

  /**
   * Allows us to verify if the element exist
   */
  has(selector) {
    return $(this._rootNode.nativeElement).find(selector).length;
  }
}
