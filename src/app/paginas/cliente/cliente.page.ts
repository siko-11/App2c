import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonBackButton,IonButton,
  IonList,IonItem,IonLabel,LoadingController,IonInput,IonCheckbox } from '@ionic/angular/standalone'
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { GeneralService } from 'src/app/servicios/general.service';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
  standalone: true,
  imports: [CommonModule,FormsModule,IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonBackButton,IonButton,
  IonList,IonItem,IonLabel,IonInput,IonCheckbox]
})
export class ClientePage implements OnInit {
  id:number=0;
  objCliente:any={
     cli_id: 0,
     cli_identificacion: "",
     cli_nombre: " ",
     cli_telefono: "",
     cli_correo: "",
     cli_direccion: "",
     cli_pais: "",
     cli_ciudad: " ",
     cli_estado: "A"
  }
  constructor(
    private route:ActivatedRoute,
    private servC:ClientesService,
    private servG:GeneralService,
    private loading:LoadingController
  ) { 
    this.id=this.route.snapshot.params["id"]?this.route.snapshot.params["id"]:0;
    console.log("Cliente", this.id );
  
  }

  ngOnInit() {
  }
ionViewWillEnter(){
   if (this.id > 0) {
    this.servC.getClientexid(this.id).subscribe((respuesta: any) => {
      this.objCliente = respuesta;

      if (!this.objCliente.cli_estado) {
        this.objCliente.cli_estado = 'A';
      }

      console.log(this.objCliente);
    });
  }
}


async funGrabar(){
  if(this.objCliente.cli_identificacion==''){
    this.servG.fun_Mensaje("Debe registrar la cedula")
  }else{
    let l= await this.loading.create();
    l.present();
    await this.servC.grabarCliente(this.objCliente).subscribe(
      (respuesta)=>{
        //console.log(JSON.stringify(respuesta));        
        l.dismiss();
        this.servG.fun_Mensaje("Se registró con éxito")
        if(respuesta.cli_id>0){
          this.servG.irA('/clientes');
        }
      },(error)=>{
        l.dismiss();
        this.servG.fun_Mensaje("Error al registrar el cliente")
      }
    )
  }
  
}

onEstadoChange(event: any) {
  this.objCliente.cli_estado = event.detail.checked ? 'A' : 'I';
}

}
