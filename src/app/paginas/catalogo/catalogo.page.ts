import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {LoadingController,IonicModule} from '@ionic/angular'
import { CatalogoService } from 'src/app/servicios/catalogo.service';
import { GeneralService } from 'src/app/servicios/general.service';
@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CatalogoPage implements OnInit {
listaproductos:any[]=[];
mostrarSoloActivos: boolean = true;
objetoRespuesta:any
  constructor(
    private loading:LoadingController,
    private servC:CatalogoService,
    public servG:GeneralService

  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.cargarProductos();
  }


 async cargarProductos() {
  const l = await this.loading.create();
  l.present();

  this.servC.get_productos().subscribe({
    next: (respuesta: any) => {
      this.objetoRespuesta = respuesta;
      this.listaproductos= this.objetoRespuesta.data
      console.log(this.listaproductos)
        l.dismiss();
    },
    error: (error) => {
      l.dismiss();
      this.servG.fun_Mensaje("Error al recuperar los clientes");
    }
  });
}

}
