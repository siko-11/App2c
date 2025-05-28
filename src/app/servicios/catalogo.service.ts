import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  constructor(
    private servG:GeneralService,
    private http:HttpClient
  ) { }

  get_productos(){
    let url= this.servG.URLSERV+'productos';

    //console.log(url);
    return this.http.get<any>(url);
    
  }
}
