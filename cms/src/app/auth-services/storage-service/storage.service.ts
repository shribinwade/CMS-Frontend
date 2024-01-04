import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


const TOKEN = 'token'
const USER = 'user'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static saveToken(token:string):void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }

  static saveUser(user: any):void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER,JSON.stringify(user));
  }

  static getToken():string{
    return localStorage.getItem(TOKEN);
  }

  static validateRole():string{
      
      const token = this.getToken();
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.sub;
      const userRole = decodedToken.role;
      
      if(userRole==='admin'){
        console.log("admin:")
        return "admin";
      }else{
        console.log("user:")
        return "user";
      }
    
  }

  static isAdminLoggedIn(): boolean{
    if(this.getToken() === null){
      return false;
    }
    const role: string = this.validateRole();
    return role == "admin";
  }

  static isUserLoggedIn():boolean{
    if(this.getToken() === null){
      return false;
    }
    const role: string = this.validateRole();
    return role == "user";
  }

  static signout(){
    window.localStorage.removeItem(TOKEN);
  }
}
