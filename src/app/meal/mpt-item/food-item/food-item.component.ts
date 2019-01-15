import { Component, OnInit, Input } from "@angular/core";
import { Food } from "../../food-interface";
import { MptService } from "../../mpt.service";
import { MatDialog } from "@angular/material";
import { EditFoodDialogComponent } from "./edit-food-dialog/edit-food-dialog.component";
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray
} from "@angular/forms";
import { Params, ActivatedRoute } from "@angular/router";
import { Mpt } from "../../mpt.interface";
import { Subscription } from "rxjs";

@Component({
  selector: "app-food-item",
  templateUrl: "./food-item.component.html",
  styleUrls: ["./food-item.component.css"]
})
export class FoodItemComponent implements OnInit {
  @Input() foodItem: Food;
  showEditQuantity = false;
  editFoodForm: FormGroup;
  currentMptId: string;
  currentMpt: Mpt;
  mptSubscribtion: Subscription;

  constructor(
    private fb: FormBuilder,
    private mptService: MptService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.editFoodForm = this.fb.group({
      quantity: ["", Validators.required]
    });
    this.route.params.subscribe((params: Params) => {
      this.currentMptId = params["id"];
    });
    this.getMpt();
  }
  getMpt() {
    this.mptSubscribtion = this.mptService.mptItem.subscribe(item => {
      this.currentMpt = item;
    });
  }
  // openDialog() {
  //   const dialogRef = this.dialog.open(EditFoodDialogComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //
  //   });
  // }
  changeShowEditQuantity() {
    this.showEditQuantity = !this.showEditQuantity;
  }
  async onEnter(value: number) {
    const formValue = this.editFoodForm.value.quantity;

    try {
      // await this.mptService.setNextFood(this.foodItem, formValue);
      // this.changeShowEditQuantity();

      this.mptService.updateMpt(this.currentMpt, this.foodItem, value);
    } catch (err) {
      console.error(err);
    }
  }
  /*   removeFoodItem(food: Food) {
    if (this.currentMpt.breakfastIngredients) {
      if (this.currentMpt.breakfastIngredients.foodArray.indexOf(food)) {
        const index = this.currentMpt.breakfastIngredients.foodArray.indexOf(food);
        this.currentMpt.breakfastIngredients.foodArray.splice(index, 1);
      }
    }
    if (this.currentMpt.lunchIngredients.foodArray) {
      if (this.currentMpt.lunchIngredients.foodArray.indexOf(food)) {
        const index = this.currentMpt.lunchIngredients.foodArray.indexOf(food);
        this.currentMpt.lunchIngredients.foodArray.splice(index, 1);
      }
    }
    if (this.currentMpt.dinnerIngredients) {
      if (this.currentMpt.dinnerIngredients.foodArray.indexOf(food)) {
        const index = this.currentMpt.dinnerIngredients.foodArray.indexOf(food);
        this.currentMpt.dinnerIngredients.foodArray.splice(index, 1);
      }
    }
    if (this.currentMpt.snacksIngredients) {
      if (this.currentMpt.snacksIngredients.foodArray.indexOf(food)) {
        const index = this.currentMpt.snacksIngredients.foodArray.indexOf(food);
        this.currentMpt.snacksIngredients.foodArray.splice(index, 1);
      }
    }
    this.mptService.updateMpt(this.currentMpt,food, );
  } */
}
