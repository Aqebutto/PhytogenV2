import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { MealDialogComponent } from "./meal-dialog/meal-dialog.component";
import { Mpt } from "./mpt.interface";
import { Observable, Subscription } from "rxjs";
import { MptService } from "./mpt.service";

@Component({
  selector: "app-meal",
  templateUrl: "./meal.component.html",
  styleUrls: ["./meal.component.css"]
})
export class MealComponent implements OnInit {
  displayedColumns: string[] = ["title", "comment"];
  mptList: Mpt[];
  mptSubscribtion: Subscription;
  constructor(public dialog: MatDialog, private mptService: MptService) {}

  ngOnInit() {
    this.mptSubscribtion = this.mptService.mptsChanged.subscribe(
      mpts => (this.mptList = mpts)
    );
    this.mptService.fetchMpts();
  }
  openDialog() {
    const dialogRef = this.dialog.open(MealDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
