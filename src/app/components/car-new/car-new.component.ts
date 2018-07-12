import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Car } from '../../models/car';
import { UserService } from '../../services/user.service';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-new',
  templateUrl: './car-new.component.html',
  styleUrls: ['./car-new.component.css'],
  providers: [UserService, CarService]
})
export class CarNewComponent implements OnInit {

  page_title;
  car: Car;
  token;
  identity;
  status_car:string;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _carService: CarService
  ) {
    this.page_title= 'Crear nuevo coche';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    if(this.identity == null){
      this._router.navigate(['/login']);
    }else{
      this.car = new Car(1,'','',0,'',null,null);
    }
  }

  onSubmit(form){
    this._carService.create(this.token, this.car).subscribe(
      response => {
        if(response.status == 'success'){
            this.car = response.car;
            this.status_car = 'success';
            this._router.navigate(['/home']);
        }else{
          this.status_car = 'error';
        }

      },
      error => {
        console.log(<any>error);
        this.status_car = 'error';
      }
    );
  }

}
