import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ToasterService} from './services/toaster.service';
import {MatDialog} from '@angular/material/dialog';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {initFlowbite} from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'videogamesFront';

  constructor(
    private toasterService: ToasterService,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet) {
  }

  ngOnInit(){
    initFlowbite();
  }
}
