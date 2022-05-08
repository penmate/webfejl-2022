import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import {User} from '../../shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    repassword: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
    }),
  })

  constructor(private location: Location, private authService: AuthService,private router: Router, private userService: UserService ) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.authService.signup(this.signUpForm.get('email')?.value,this.signUpForm.get('password')?.value).then(cred => {
      console.log(cred);
      const user: User = {
        id: cred.user?.uid as string,
        email: this.signUpForm.get('email')?.value,
        username: this.signUpForm.get('email')?.value.split('@')[0],
        name:{
          firstname: this.signUpForm.get('name.firstname')?.value,
          lastname: this.signUpForm.get('name.lastname')?.value
        }
      };
      this.router.navigateByUrl('/main');
      this.userService.create(user).then(_ => {
        console.log('User added successfully');
        this.router.navigateByUrl('/main');
      }).catch(error => {
        console.error(error);
      })
    }).catch(error => {
      console.error(error);
    }).finally(() => {
      console.log("FINALLY");
    });
  }

  goBack() {
    this.location.back();
  }

}
