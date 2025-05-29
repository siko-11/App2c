import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonGrid,IonContent, IonHeader, IonTitle, IonToolbar,IonRow,IonCol, IonCard,IonCardContent,IonIcon,IonCardTitle } from '@ionic/angular/standalone';
import { GeneralService } from 'src/app/servicios/general.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonGrid,IonRow,IonCol,
    IonCardContent,IonIcon, IonCardTitle
  ]
})
export class PrincipalPage implements OnInit {

  constructor(public servG:GeneralService) { }

  ngOnInit() {
  }

}
