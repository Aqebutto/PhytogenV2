import { Component, OnInit, Output, EventEmitter, OnDestroy ,ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material';
import { MealDialogComponent } from './create-mpt-dialog/meal-dialog.component';
import { Mpt } from './mpt.interface';
import { Observable, Subscription } from 'rxjs';
import { MptService } from './mpt.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-mpt',
  templateUrl: './mpt.component.html',
  styleUrls: ['./mpt.component.css'],
})
export class MptComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['title', 'comment'];
  mpts: Mpt[];
  mptSubscribtion: Subscription;
  currentMptObservable: Observable<Mpt>;
  // @Output() mptEvent = new EventEmitter<Mpt>();
  constructor(public dialog: MatDialog, private mptService: MptService) { }

  ngOnInit() {
    this.mptSubscribtion = this.mptService.mptsChanged.subscribe(
      mpts => {
        this.mpts = mpts;
      }
    );
    this.mptService.fetchMpts();
  }
  openDialog() {
    const dialogRef = this.dialog.open(MealDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  sendMpt(mpt: Mpt) {
    this.currentMptObservable = this.mptService.getMpt(mpt.id).pipe(
      map((mptItem: Mpt) => mptItem)
    );
    this.currentMptObservable.subscribe(f => {
      this.mptService.setNextMpt(f);
    });
  }
  ngOnDestroy() {
    this.mptSubscribtion.unsubscribe();
  }
}
