import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private-login',
  templateUrl: './private-login.component.html',
  styleUrls: ['./private-login.component.scss']
})
export class PrivateLoginComponent implements OnInit {
  title: string;
  id: string;
  form: FormGroup;
  password: string
  constructor(
              private dialogRef: MatDialogRef<PrivateLoginComponent>,  
              @Inject(MAT_DIALOG_DATA) data,
              private userService: UserService,
              private router: Router) { 
                this.title = data['title']
                this.id = data['id']
              }

  ngOnInit() {
    console.log(this.title, this.id)
  }

  close() {
    this.userService.postLoginPrivateCorkBoard(this.id, this.password).subscribe((data) => {
      console.log(data);
      if(data['isValid'] == true) {
        this.router.navigate(['/viewcorkboard/', this.id]);
      }
      this.dialogRef.close()
    })
    
  }

}
