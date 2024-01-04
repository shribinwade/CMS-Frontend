import { Component } from '@angular/core';
import { DemoNgZorroAntdModule } from 'src/app/DemoNgZorroAntdModule';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AdminService } from '../../admin-services/admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  categoryForm: FormGroup;

  constructor(
    private service: AdminService,
    private fb: FormBuilder
  ){}

  ngOnInit(){
    this.categoryForm= this.fb.group({
      name:["",Validators.required]
    })
  }

  postCategory(){
    console.log(this.categoryForm.value)
    this.service.postCategory(this.categoryForm.value).subscribe(
      (res) =>{
        console.log(res);
      }
    )
  }

}
