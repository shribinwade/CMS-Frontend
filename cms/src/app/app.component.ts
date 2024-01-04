import { Component, OnInit } from '@angular/core';
import { StorageService } from './auth-services/storage-service/storage.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'cms';

   isAdminLoggedIn:boolean ;
   isUserLoggedIn:boolean ;

   constructor(private router:Router){}

    ngOnInit(){
    this.router.events.subscribe(event =>{
      if(event.constructor.name ==="NavigationEnd"){
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isUserLoggedIn = StorageService.isUserLoggedIn();
      }
    })
    }
    logout() {
      StorageService.signout();
      this.router.navigateByUrl("/login");
      }


}
