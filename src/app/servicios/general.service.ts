import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {
public proceso: number = 2; //1:local 2:web
public URLSERV:string ="";
urlimg:string="";
  constructor( private router:Router,
    private toast:ToastController) { 
      if (this.proceso ==1){
          this.URLSERV="http://localhost:3000/api/";
          this.urlimg="http://localhost:3000";
      }else{
        this.URLSERV="https://app-api-xyvjti-c45763-95-216-145-249.traefik.me/";
      }
    }
    //funciones generales
  irA(url:string){
    this.router.navigateByUrl(url);
  }
 
  //funcion emite mensaje
  async fun_Mensaje(texto: string, tipo: string = 'success') {
    let t = await this.toast.create({
      message: texto,
      color: tipo,
      duration: 3000
    });
    t.present();
  }

  imagenUrl(urlimagen:any){
    let url=this.urlimg+urlimagen;
    console.log(url);
    
    return url;
  }
}

