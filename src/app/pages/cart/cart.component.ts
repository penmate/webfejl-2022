import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  inCart?: string;
  price?: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
var ls = JSON.stringify(localStorage.getItem('namepic'));
var asd = JSON.stringify(localStorage.getItem('pricepic'));
    var str = ls.slice(3);
    str = str.slice(0, -3);
    var str2 = asd.slice(3);
    str2 = str2.slice(0,-3);

    if (ls) {
      console.log('ls' + str);
      this.inCart = str;
      this.price = str2;
    }
  }

  buy() {
    localStorage.removeItem('namepic');
    localStorage.removeItem('pricepic');
    this.router.navigateByUrl('/successful');
  }

  clear(){
    localStorage.removeItem('namepic');
    localStorage.removeItem('pricepic');
    window.location.reload();
  }

}
