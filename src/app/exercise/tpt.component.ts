import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TptService } from './tpt.service';
import { Observable, Subscription } from 'rxjs';
import {MatDialog} from '@angular/material';
import { Tpt } from './tpt';
import { CreateTptDialogComponent } from './create-tpt-dialog/create-tpt-dialog.component';

@Component({
  selector: 'app-tpt',
  templateUrl: './tpt.component.html',
  styleUrls: ['./tpt.component.css']
})
export class TptComponent implements OnInit {
  displayedColumns: string[] = ['title', 'comment'];
  tpts: Tpt[];
  tptSubscribtion: Subscription;
  // @Output() tptEvent = new EventEmitter<tpt>();
  constructor(public dialog: MatDialog, private tptService: TptService) { }

  ngOnInit() {
    this.tptSubscribtion = this.tptService.tptsChanged.subscribe(
      tpts => {
        this.tpts = tpts;
      }
    );
    this.tptService.fetchtpts();
  }
  openDialog() {
    const dialogRef = this.dialog.open(CreateTptDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
