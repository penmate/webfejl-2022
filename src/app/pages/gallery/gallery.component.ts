import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GalleryService } from '../../shared/services/gallery.service';
import { GalleryObject } from '../../shared/constants/constants';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/User';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  galleryObject: Array<any> = GalleryObject;
  chosenImage: any;
  user?: User;
  toBuy: string = '';

  constructor(private galleryService: GalleryService, private userService: UserService) {
    this.chosenImage = this.galleryObject[0];
   }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data => {
      // console.log("EZ A DATA" + data?.username);
      this.user = data;

    }, error => {
      console.error(error);
    });
    this.galleryService.loadImageMeta('__credits.json').subscribe((data: Array<any>) => {
      this.galleryObject = data;
    })
  }

  loadImage(imageObject: any) {
    this.chosenImage = imageObject;
  }

  reload(){

  }

  addToCart(){
    
    const jsonData = JSON.stringify(this.chosenImage.id);
    const jsonData2 = JSON.stringify(this.chosenImage.price);
    
    // console.log(jsonData2);
   localStorage.setItem('namepic', jsonData);
   localStorage.setItem('pricepic', jsonData2);
  // console.log(localStorage.getItem('namepic'))
  }

}

