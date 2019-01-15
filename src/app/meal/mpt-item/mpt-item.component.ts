import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnDestroy,
  AfterViewChecked,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  ElementRef
} from "@angular/core";
import { Mpt } from "../mpt.interface";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  copyArrayItem
} from "@angular/cdk/drag-drop";
import { MatDialog } from "@angular/material";
import { MptService } from "../mpt.service";
import { CreateFoodDialogComponent } from "./create-food-dialog/create-food-dialog.component";
import { Observable, Subscription, BehaviorSubject } from "rxjs";
import { Food } from "../food-interface";
import { Meal } from "../meal-interface";
import { CreateMealDialogComponent } from "../mpt-item/create-meal-dialog/create-meal-dialog.component";
import { ActivatedRoute, Params } from "@angular/router";
import { MptComponent } from "../mpt.component";
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray
} from "@angular/forms";
import { map, startWith } from "rxjs/operators";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-mpt-item",
  templateUrl: "./mpt-item.component.html",
  styleUrls: ["./mpt-item.component.css"]
})
export class MptItemComponent implements OnInit, OnDestroy {
  @ViewChild("breakfastBtn") breakfastBtn: ElementRef;
  @ViewChild("lunchBtn") lunchBtn: ElementRef;
  @ViewChild("dinnerBtn") dinnerBtn: ElementRef;
  @ViewChild("snacksBtn") snacksBtn: ElementRef;
  mealForm: FormGroup;
  foodList: Food[];
  foodSubscribtion: Subscription;
  mealList: Meal[];
  mealSubscribtion: Subscription;
  // mpts: Mpt[];
  mptSubscribtion: Subscription;
  currentMptId: string;
  currentMpt: Mpt;
  currentMptObservable: Observable<Mpt>;
  showCreateMealVal = false;
  customMeal: Meal = {
    name: "",
    foodArray: []
  };
  currentFoodArray: Food[] = this.customMeal.foodArray;
  searchMealName: string;
  // currentBreakfastName: string;
  // currentLunchName: string;
  // currentDinnerName: string;
  // currentSnacksName: string;
  foundMeal: Meal;
  public meals: Array<string>;

  myControl = new FormControl();
  filteredOptions: Observable<Meal[]>;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private mptService: MptService,
    private route: ActivatedRoute
  ) {
    this.meals = ["Breakfast", "Lunch", "Dinner", "Snacks"];
  }
  ngOnInit() {
    this.foodSubscribtion = this.mptService.foodsChanged.subscribe(
      foods => (this.foodList = foods)
    );
    this.mptService.fetchFood();
    this.mealSubscribtion = this.mptService.mealsChanged.subscribe(
      meals => (this.mealList = meals)
    );
    this.mptService.fetchMeal();
    this.route.params.subscribe((params: Params) => {
      this.currentMptId = params["id"];
    });
    this.mealForm = this.fb.group({
      name: ["", Validators.required]
    });
    this.getMpt();
    this.mptService.mealsChanged.subscribe(
      meals =>
        (this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith<string | Meal>(""),
          map(value => (typeof value === "string" ? value : value.name)),
          map(name => (name ? this._filter(name) : meals.slice()))
        ))
    );
  }
  displayFn(meal?: Meal): string | undefined {
    return meal ? meal.name : undefined;
  }

  private _filter(name: string): Meal[] {
    const filterValue = name.toLowerCase();

    return this.mealList.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
  getMpt() {
    this.mptSubscribtion = this.mptService.mptItem.subscribe(item => {
      this.currentMpt = item;
    });
  }

  drop(event: CdkDragDrop<Food[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(CreateFoodDialogComponent);

    dialogRef.afterClosed().subscribe(result => {});
  }
  openDialog2() {
    const dialogRef = this.dialog.open(CreateMealDialogComponent);

    dialogRef.afterClosed().subscribe(result => {});
  }
  showCreateMeal() {
    this.showCreateMealVal = true;
  }
  get foodForms() {
    return this.mealForm.get("food") as FormArray;
  }
  deleteFood(i) {
    this.foodForms.removeAt(i);
  }
  async CreateMeal() {
    const mealName = this.mealForm.value.name;
    const mealFood = this.currentFoodArray;
    const meal: Meal = {
      name: mealName,
      foodArray: mealFood
    };

    try {
      await this.mptService.addMealToFirestore(meal);
    } catch (err) {
      console.error(err);
    }
    this.currentFoodArray = [];
    this.mealForm.reset();
    this.customMeal.name = "";
  }
  searchForMeal(searchString) {
    this.mealList.filter(meal => {
      if (meal.name == searchString) {
        this.foundMeal = meal;
      }
    });
  }
  addMealToMpt(event, item) {
    this.currentMpt.id = this.currentMptId;
    this.mptService.setMeal(this.currentMpt, item, this.foundMeal);
  }
  deleteMealFromMpt(foodArray: Food[]) {
    // this.mptService.updateMpt(this.currentMpt);
  }
  ngOnDestroy(): void {
    this.mptSubscribtion.unsubscribe();
    this.foodSubscribtion.unsubscribe();
    this.mealSubscribtion.unsubscribe();
  }
  // this.mptService.searchMeal('9H9dy79bXlwPSpzPV4vk')
  // .subscribe(x =>
  // searchMeal(searchString: string) {
  //   const doc: AngularFirestoreDocument<Meal> = this.db.doc('Meal/' + searchString);
  //   const doc$: Observable<Meal> = doc.valueChanges();
  //   return doc$;
  // }
}
