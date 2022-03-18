import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  btnAdd:boolean;
  btnEdit:boolean;

  formValue !: FormGroup;

  userId;
  
  userData : any;

  
  constructor(private formbuilder : FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
       email : [''],       
       mobile : [''],
       salary : ['']
    })
    this.getAllUser();
  }






  postUserDetails(){
       this.api.postUser(this.formValue.value).subscribe(res => {
        //  console.log(res);
       
         let ref= document.getElementById('cancel');
         ref?.click();
         this.formValue.reset();
         this.getAllUser();
       },
       err => {
           alert('Error')
       })
  }






  getAllUser(){
      this.api.getUser().subscribe(res => {
        // console.log(res);
        this.userData = res;
        // console.log(res);
      })
  } 





  onEdit(obj:any){

    this.btnEdit = true;
    this.btnAdd = false;
    
    this.formValue.controls['firstName'].setValue(obj.firstName);
    this.formValue.controls['lastName'].setValue(obj.lastName);
    this.formValue.controls['email'].setValue(obj.email);
    this.formValue.controls['mobile'].setValue(obj.mobile);
    this.formValue.controls['salary'].setValue(obj.salary);
    this.userId = obj._id
  }


  updateUserDetails(){

    this.api.updateUser(this.formValue.value  , this.userId).subscribe(res => {
      // console.log(res);
      this.getAllUser();
    })
    let ref= document.getElementById('cancel');
         ref?.click();
         this.formValue.reset();
  }



  
  
  onDelete(obj:any){
    // console.log(obj);
    this.api.deleteUser(obj._id).subscribe(res => {
      //  console.log(res);
       this.getAllUser()
    });
  }



  btnShow(){
    this.formValue.reset();
     this.btnEdit = false;
     this.btnAdd = true;
  }





}
