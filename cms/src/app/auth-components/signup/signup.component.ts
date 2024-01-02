import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  confirmationValidator = (control: FormControl):{[s:string]: boolean} =>{
    if(!control.value){
      return {require:true};
    }else if(control.value !== this.validateForm.controls['password'].value){
      return {confirm:true,error:true}
    }
    
    return {};
  }


  constructor(private service:AuthService, private fb:FormBuilder){
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
  register(){
   console.log(this.validateForm.value);
    this.service.signup(this.validateForm.value).subscribe((res) =>{
      console.log(res);
    })
  }

}
