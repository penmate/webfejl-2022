import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { FakeLoadingService } from '../../shared/services/fake-loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  email = new FormControl('');
  password = new FormControl('');

  loadingSubscription?: Subscription;
  loading: boolean = false;

  constructor(private router: Router, private loadingService: FakeLoadingService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
   /* this.loading = true;
    this.loadingService.loadingWithPromise(this.email.value, this.password.value).then((_: boolean) => {
      this.router.navigateByUrl('/main');
    }).catch(error => {
      console.error('Incorrect email or password');
      this.loading = false;
    }).finally(() => {
      console.log("FINALLY");
      this.loading = false;
    }); */
    this.loading = true;
    this.authService.login(this.email.value, this.password.value).then(cred => {
    console.log(cred);
    this.router.navigateByUrl('/main');
    this.loading = false;
  }).catch(error => {
    console.error(error);
    this.loading = false;
  }).finally(() => {
    console.log("FINALLY");
    this.loading = false;
  });



  }

  async login2(){
    try {
      const _ = await this.loadingService.loadingWithPromise(this.email.value, this.password.value)
     // console.log(bool, "second");
        this.router.navigateByUrl('/main');
      } catch(error) {
        console.error('Incorrect email or password');
      }
        console.log("FINALLY");
      };

login3(){
  this.loadingSubscription = this.loadingService.loadingWithObservable(this.email.value, this.password.value).subscribe((data: boolean) => {
      console.log(data);
  });

}

ngOnDestroy() {
  this.loadingSubscription?.unsubscribe();
}
}
