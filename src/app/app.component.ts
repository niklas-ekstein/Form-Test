import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import Swal from 'sweetalert2';

export interface user {
  userName: string;
  email: string;
  phone: number;
  amount: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  message: string = "App component, from toggle event "

  name: string="";
  isSubmitted:boolean = false;
  count=0; // using for formArray elements
  formData = {
    name: '',
    email: '',
    phone: '',
    amount: 0,
    family: [
      {
        rname: '',
        relation: '',
      }
    ]
  }

  constructor(private _fb: FormBuilder, public dialog: MatDialog) {
    this.myDataArray = new MatTableDataSource<user>([...this.USER_DATA]);
   }

  ngOnInit(): void {
  }

  myReactiveForm = this._fb.group({
       'name' : new FormControl<string|null>(null, Validators.required),
       'email' : new FormControl<string|null>(null, [Validators.required, Validators.email]),
       'phone' : new FormControl<string|null>(null, Validators.required),
       'amount' : new FormControl<number|null>(1),
    family: this._fb.array([])
  })
  
  addMember(){
    this.count++; //
    if(this.count >= 2){
      this.formData.family.push({
        rname: '',
        relation: '',
      })
    }
    this.members.push(this.memberAdded())
  }

  get members():FormArray{
    return this.myReactiveForm.get('family') as FormArray;
  }

  memberAdded() {
    return this._fb.group({
      rname: ['', [Validators.required]],
      relation: ['', [Validators.required]]
    });
  }

  removeMember(){
    this.isSubmitted = false;
    this.members.removeAt(this.members.length-1);
    this.count--;
    this.formData.family.splice(this.count) //alsoo..
  }

  onSubmit(form:FormGroup){
    
    
    this.isSubmitted = true;
    this.formData.name = form.value.name;
    this.formData.email = form.value.relation;

    for(let i = 0; i < this.count; i++){
      this.formData.family[i].rname = form.value.family.rname;
      this.formData.family[i].relation = form.value.family.relation;
      form.value.amount = i+2;
    }

    this.addUser(form)
  }

  receiveMessage($event) {
    this.message = $event
  }

  
  columnsToDisplay: string[] = ["userName", "email", "phone","amount","actions"];
  public USER_DATA: user[] = [
    { userName: "Niklas Ekstein", email: "niklas@gmail.com" ,phone:777777777, amount:4},
    { userName: "Frank Lampard", email: "frank@chelsea.com" ,phone:888888888, amount:5},
    { userName: "Steven Gerrard", email: "stevie@liverpool.com" ,phone:999999999, amount:3}
  ];
  public newUser = {userName: "ABC", email: "abc@gmail.com", phone:666666666, amount:21000};
  public myDataArray: any;

  
  addUser(form:FormGroup) {
    if(this.newUser.userName!=""&&this.newUser.email!=""&&this.newUser.phone!=0&&this.newUser.amount!=0){
      this.newUser.userName=form.value.name;
      this.newUser.email=form.value.email;
      this.newUser.phone=form.value.phone;
      this.newUser.amount=form.value.amount;

      

      const newUsersArray = this.USER_DATA;
      newUsersArray.push(this.newUser);
      this.myDataArray = [...newUsersArray];
      this.newUser = {userName:"User name", email: "abc@gmail.com", phone:0, amount:0};
    }else{
      Swal.fire(':-|', 'Invalid input values..!', 'error')
    }
    
  }

  delete(row_obj:any){
    this.USER_DATA = this.USER_DATA.filter((value,key)=>{
      return value.email != row_obj.email;
    });
    this.myDataArray = [...this.USER_DATA];//refresh the dataSource
    Swal.fire('Deleted successfully!')
  }

  openDialog(row_obj:any): void {
    let dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: { name: this.name }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.name = result;
      if(this.name!=undefined){
        if(this.name==""){
          Swal.fire('Username cannot be empty..!')
        } else{
          row_obj.userName=this.name
          const newUsersArray = this.USER_DATA;
          this.myDataArray = [...newUsersArray];
          Swal.fire('Updated successfully..!')
        }
      }
    });
  }

}
