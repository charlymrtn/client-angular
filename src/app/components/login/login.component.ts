import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [UserService]
})

export class LoginComponent implements OnInit{
  title:string;
  user: User;
  status:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
    this.title= 'Identificate';
    this.user = new User(1,'ROLE_USER','','','');
  }

  ngOnInit(){
    console.log('Login component cargado correctamente');
  }

  onSubmit(form){
    console.log(this.user);

    this._userService.signUp(this.user).subscribe(
      response => {
          console.log(response);

          this._userService.signUp(this.user,true).subscribe(
            response => {
                console.log(response);
            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
        );

      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
  );
  }
}
