import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';

const BASIC_URL=["http://localhost:8081/"]

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  postCategory(data:any):Observable<any>{
    return this.http.post<[]>(BASIC_URL + "category/add",data,{
      headers:new HttpHeaders()
      .set("Authorization","Bearer "+StorageService.getToken())
    })
  }

 

}
