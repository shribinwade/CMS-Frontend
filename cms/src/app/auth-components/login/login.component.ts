import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/auth-services/auth-service/auth.service';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSpinning: boolean;

  constructor(private service:AuthService,private fb:FormBuilder,private notification:NzNotificationService,
    private router:Router){}
 
  ngOnInit(): void {
   this.loginForm = this.fb.group({
    
      email:["",Validators.required],
      password:["",Validators.required],

   }) 
  }
   submitForm(){
    this.service.login(this.loginForm.value).subscribe(
      (res)=>{
      console.log(res);
      if(res.token != null){
        StorageService.saveToken(res.token);
        console.log("Success login");
        if(StorageService.isAdminLoggedIn()){
          this.router.navigateByUrl("admin/dashboard");
        }else if(StorageService.isUserLoggedIn){
          this.router.navigateByUrl("user/dashboard");
        }
      }
    },
    (error) => {
      console.error('login failed', error);
      // Display error message to the user
      this.notification.error('Error', 'Something went wrong', {
        nzDuration: 5000
      });
    }
    )
    
   }
  

}


