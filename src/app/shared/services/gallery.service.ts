import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage} from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

collectionName = 'Images';

  constructor(private http: HttpClient, private afs: AngularFirestore, private storage: AngularFireStorage) { }

  loadImageMeta(metaUrl: string): Observable<any>{
    //  return this.http.get(environment.hostUrl + '/assets/'+ metaUrl);
    return this.afs.collection<any>(this.collectionName).valueChanges();

  }

  loadImage(imgUrl: string){
   // return this.http.get(environment.hostUrl + '/assets/' + imgUrl, {responseType: 'blob'});
    return this.storage.ref(imgUrl).getDownloadURL();
  }
}
