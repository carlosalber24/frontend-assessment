import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../providers/authentication.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../../../providers/auth.guard';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  myform: FormGroup;
  error: any = null;
  public loader: boolean = false;

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private authGuard: AuthGuard
  ) 
  {}

  /**
   * Call initial methods needed to be loaded in the page
   */
  ngOnInit() {
    if (this.authGuard.isLoggedIn()) {
      this.router.navigate(['/app']);
    }

    this.myform = new FormGroup({
      username: new FormControl('', [ Validators.required]),
      password: new FormControl('', [ Validators.required, Validators.minLength(3) ]),
    });
  }

  /**
   * Send login data to grant access to the main app
   */
  async signIn(){
    if (this.myform.valid) {
      this.loader = true;
      this.error = null;
      let data = {
        username: this.myform.value.username,
        password: this.myform.value.password
      }
      const result = await this.authService.login(data);
      this.loader = false;

      if (result) this.router.navigate(['/app']);
      if (!result) 
        this.error = 'Username or Password incorrect.';
        setTimeout(() => { this.error = null; }, 3000);

    } else {
      this.error = 'Please verify all fields.';
      setTimeout(() => {
        this.error = null;
      }, 4000);

      return false;
    }
  }
}
