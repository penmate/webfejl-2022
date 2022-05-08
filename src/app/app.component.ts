import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable, Subscriber } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ArtWebshop';
  page = '';
  loggedInUser?: firebase.default.User | null;
  isShopping: boolean = false;

  routes: Array<string> = [];

  constructor(private router: Router, private authService: AuthService) { 
    
  }

  ngOnInit() {
    this.routes = this.router.config.map(conf => conf.path) as string[];

    
    //rxjs
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evnts: any) => {
      const currentPage = (evnts.urlAfterRedirects as string).split('/')[1] as string;
      if (this.routes.includes(currentPage)){
        this.page = currentPage;
      }
    })
    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      localStorage.setItem('user',JSON.stringify(this.loggedInUser))
    }, error => {
      console.error(error);
      localStorage.setItem('user', JSON.stringify('null'));
    })
  };



  changePage(selectedPage: string) {
    // this.page = selectedPage;
    this.router.navigateByUrl(selectedPage);
  }

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav){
    if (event === true){
      sidenav.close();
    }
  }
logout(_?: boolean){
  this.authService.logout().then(() => {
    console.log('logged out successfully');
    localStorage.clear();
  }).catch(error => {
    console.error(error);
  });
  
}






    


}

