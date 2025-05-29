import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  NavController, IonHeader, IonButtons,IonToolbar,IonTitle,IonBackButton,IonContent,IonList,
  IonItem,IonThumbnail,IonLabel,IonButton,IonBadge,IonIcon,IonCard,IonCardContent
} from '@ionic/angular/standalone';
import { GeneralService } from 'src/app/servicios/general.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: true,
  imports: [IonButtons, IonHeader,  CommonModule, FormsModule,IonToolbar,IonTitle,IonBackButton,IonContent,IonList,
    IonItem,IonThumbnail,IonLabel,IonButton,IonBadge,IonIcon,IonCard,IonCardContent
  ]
})
export class CarritoPage implements OnInit {
  carrito: any[] = [];

  constructor(
    public servG: GeneralService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // Recuperar el carrito desde localStorage o un servicio compartido
    const datos = localStorage.getItem('carrito');
    this.carrito = datos ? JSON.parse(datos) : [];
  }

  guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  aumentarCantidad(producto: any) {
    producto.cantidad++;
    this.guardarCarrito();
  }

  disminuirCantidad(producto: any) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    } else {
      this.eliminarProducto(producto);
    }
    this.guardarCarrito();
  }

  eliminarProducto(producto: any) {
    this.carrito = this.carrito.filter(p => p.prod_codigo !== producto.prod_codigo);
    this.guardarCarrito();
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + item.prod_precio * item.cantidad, 0);
  }

  finalizarCompra() {
    this.servG.fun_Mensaje("Gracias por tu compra.");
    this.carrito = [];
    localStorage.removeItem('carrito');
    this.navCtrl.navigateBack('/catalogo');
  }
}
