import { MatButtonModule } from '@angular/material/button';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { EmpserviceService } from '../empservice.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CoreService } from '../core/core.service';



@Component({
  selector: 'app-add-form',
  standalone: true,
  imports: [MatFormFieldModule,ReactiveFormsModule,MatInputModule,MatButtonModule,MatNativeDateModule,MatDatepickerModule,HttpClientModule,CommonModule,MatDialogModule],
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.scss',
  providers: [provideNativeDateAdapter(),EmpserviceService],
})
export class AddFormComponent implements OnInit{
  genders:string[]=['Male','Female','Other']
  departments:string[]=['IT','HR','Sales','Finance']
  constructor(public dialogRef:MatDialogRef<AddFormComponent>  ,@Inject(MAT_DIALOG_DATA) public data:any ,private _empService:EmpserviceService,private _coreService:CoreService) {}
  ngOnInit(): void {
 this.empForm.patchValue(this.data)
  }
  
  empForm:FormGroup=new FormGroup({
    
    name:new FormControl(''),
    empId:new FormControl(''),
    mobile:new FormControl(''),
    doj:new FormControl(''),
    degination:new FormControl(''),
    department:new FormControl(''),
    gender:new FormControl(''),
    experiance:new FormControl(''),
  
    
  })

  onSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this._empService.UpdateEmp(this.data.id,this.empForm.value).subscribe({
          next:(val:any) =>{
           
            this._coreService.openSnackBar('Employee updated successfully','ok');

            this.dialogRef.close(true);
    
          },error:(err:any)=>{
            console.error(err)
          }
          
        });
      }
      else{
        this._empService.post(this.empForm.value).subscribe({
          next:(val:any) =>{

            this._coreService.openSnackBar('Employee added successfully','ok');
            this.dialogRef.close(true);
    
          },error:(err:any)=>{
            console.error(err)
          },
          
        })
      }
    
    }
    

  
  
}




}
