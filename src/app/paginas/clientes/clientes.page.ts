import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import{AlertController,IonicModule} from '@ionic/angular'
import { ClientesService } from 'src/app/servicios/clientes.service';
import {LoadingController,IonItemSliding} from '@ionic/angular'
import { GeneralService } from 'src/app/servicios/general.service';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ClientesPage implements OnInit {
  objetoRespuesta:any;
listaclientes : any []=[];
  constructor(
    private servC:ClientesService,
    private loading:LoadingController,
    public servG:GeneralService,
    private alert:AlertController
  ) { }

  ngOnInit() {
    this.cargarClientes();
  }

  ionViewWillEnter(){
    this.cargarClientes();
  }


 async cargarClientes(){
    let l=await this.loading.create();
    l.present();
    this.servC.get_clientes().subscribe(
      (respuesta : any)=>{
        this.objetoRespuesta=respuesta;
        console.log(this.objetoRespuesta);
        if(this.objetoRespuesta.cant>0){
          this.listaclientes=this.objetoRespuesta.data;
          console.log(this.listaclientes);
          l.dismiss();
        }else{
          //console.log("NO EXISTEN LOS DATOS");
          this.servG.fun_Mensaje("No existen Datos")
        }
        //console.log(this.listaclientes[0].cant);
        
      },(error:any)=>{
        l.dismiss();
        this.servG.fun_Mensaje("Error al cargar los clientes")
      }
    );

  }
  fun_editar(id:number, ionItemsliding:IonItemSliding){
    ionItemsliding.close();
    //console.log("EDITAR : "+id);
    this.servG.irA('cliente/'+id);
    
  }

   async fun_eliminar(cliente:any,ionItemsliding:IonItemSliding){
    ionItemsliding.close();
    //console.log("ELIMINAR : "+id);
     let alert = await this.alert.create({
      header: 'Confirmación',
      message: '¿Está seguro que desea eliminar el cliente [' + cliente.cli_nombre + ']?',
      buttons: [
        {
          text: 'Si',
          handler: async () => {
            let l = await this.loading.create({
              message: 'Borrando...'
            });
            l.present();
           //borrar
          this.servC.borrarCliente(cliente.cli_id).subscribe(
            (respuesta)=>{
              l.dismiss();
              this.servG.fun_Mensaje("Se eliminó correctamente");
              this.cargarClientes();
            },(error)=>{
              l.dismiss();
              this.servG.fun_Mensaje("Error al eliminar el cliente")
            }
          )
          }
        },
        {
          text: 'No',
          handler: () => { }
        }
      ]
    });
    alert.present();
  }
  }


