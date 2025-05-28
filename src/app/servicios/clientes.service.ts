import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(
    private servG:GeneralService,
    private http:HttpClient,
  ) { }

  get_clientes(){
    let url= this.servG.URLSERV+'clientes';

    //console.log(url);
    return this.http.get<any>(url);
    
  }

  getClientexid(id:number){
      let url= this.servG.URLSERV+'clientes/'+id;
    return this.http.get<any>(url);
  }

  grabarCliente(objCliente:any){
    if(objCliente.cli_id>0){
      //update
      let url= this.servG.URLSERV+'clientes/'+objCliente.cli_id;
      return this.http.put<any>(url,objCliente);
    }else{
      //insert
      let url= this.servG.URLSERV+'clientes/';
      return this.http.post<any>(url,objCliente);
    }
  }

  borrarCliente(id:number){
    let url= this.servG.URLSERV+'clientes/'+id;
    return this.http.delete<any>(url);
  }
}
