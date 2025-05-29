import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController, NavController } from '@ionic/angular';
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
  listaproductos: any[] = [];
  productosFiltrados: any[] = [];
  textoBuscar: string = '';
  carrito: any[] = [];
  cantidadCarrito: number = 0;

  constructor(
    private loading: LoadingController,
    private servC: CatalogoService,
    public servG: GeneralService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.obtenerCarrito();
  }

  ionViewWillEnter() {
    this.cargarProductos();
  }

  async cargarProductos() {
    const l = await this.loading.create();
    l.present();

    this.servC.get_productos().subscribe({
      next: (respuesta: any) => {
        this.listaproductos = respuesta.data;
        this.filtrarProductos();
        l.dismiss();
      },
      error: () => {
        l.dismiss();
        this.servG.fun_Mensaje("Error al recuperar los productos");
      }
    });
  }

  filtrarProductos() {
    const texto = this.textoBuscar.toLowerCase();
    this.productosFiltrados = this.listaproductos.filter(p =>
      p.prod_nombre.toLowerCase().includes(texto)
    );
  }

  agregarAlCarrito(producto: any) {
    const index = this.carrito.findIndex(p => p.prod_codigo === producto.prod_codigo);

    if (index !== -1) {
      this.carrito[index].cantidad += 1;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }

    this.guardarCarrito();
    this.contarCarrito();
    this.servG.fun_Mensaje("Producto agregado al carrito");
  }

  guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  obtenerCarrito() {
    const datos = localStorage.getItem('carrito');
    this.carrito = datos ? JSON.parse(datos) : [];
    this.contarCarrito();
  }

  contarCarrito() {
    this.cantidadCarrito = this.carrito.reduce((acc, item) => acc + item.cantidad, 0);
  }

  irAlCarrito() {
    this.navCtrl.navigateForward('/carrito');
  }
}
