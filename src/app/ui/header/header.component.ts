import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../providers/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthenticationService,) { }

  ngOnInit() {
  }

  /** 
   * Close current session. 
   */
  logout(){
    this.authService.logout();
  }
}
