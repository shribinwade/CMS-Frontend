import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationComponent, NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/auth-services/auth-service/auth.service';
import { DemoNgZorroAntdModule } from 'src/app/DemoNgZorroAntdModule';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  validateForm : FormGroup;
  errorTpl!: string;

  responseData: any;

  confirmationValidator = (control: FormControl):{[s:string]: boolean} =>{
    if(!control.value){
      return {require:true};
    }else if(control.value !== this.validateForm.controls['password'].value){
      return {confirm:true,error:true}
    }
    
    return {};
  }


  constructor(private service:AuthService, private fb:FormBuilder,private notification:NzNotificationService){
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls['confirm'].updateValueAndValidity());
  }
  
  ngOnInit(){
     this.validateForm = this.fb.group({
      email:["",Validators.required],
      password:["",Validators.required],
      checkPassword:["",[Validators.required,this.confirmationValidator]],
      name:["",Validators.required],
      userPhone:["",Validators.required],

     })
  }
  register() {
    if (this.validateForm.valid) {
      this.service.signup(this.validateForm.value).subscribe(
        (res) => {
          console.log('Signup successful', res);

          if (res.message !== null) {
            this.notification.success('Success', 'Signup Successful', {
              nzDuration: 5000
            });
          } else {
            this.notification.error('Error', 'Something went wrong', {
              nzDuration: 5000
            });
          }
        },
        (error) => {
          console.error('Signup failed', error);

          // Display error message to the user
          this.notification.error('Error', 'Something went wrong', {
            nzDuration: 5000
          });
        }
      );
    } else {
      // Form is not valid, display a message or handle it as needed
      this.notification.warning('Warning', 'Please fill out all required fields', {
        nzDuration: 5000
      });
    }
  }
}