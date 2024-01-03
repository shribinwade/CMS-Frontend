import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const BASIC_URL=["http://localhost:8081/"]

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(data:any):Observable<any>{
    return this.http.post<[]>(BASIC_URL + "user/signup",data,{
      headers:new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  login(data:any):Observable<any>{
    return this.http.post<[]>(BASIC_URL + "user/login",data,{
      headers:new HttpHeaders().set('Content-Type', 'application/json')
    })
  }
}
