import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Subscription, Subject, Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { Mpt } from "./mpt.interface";
import { Food } from "./food-interface";
import { Meal } from "./meal-interface";

@Injectable({
  providedIn: "root"
})
export class MptService {
  private _mptItem = new BehaviorSubject<Mpt>(null);
  mptItem = this._mptItem.asObservable();

  private _foodItem = new BehaviorSubject<Food>(null);
  foodItem = this._foodItem.asObservable();

  // mptChanged = new Subject<Mpt>();
  mptsChanged = new Subject<Mpt[]>();
  mpts: Mpt[] = [];
  private mptSubs: Subscription[] = [];

  foodsChanged = new Subject<Food[]>();
  foods: Food[] = [];
  private foodSubs: Subscription[] = [];

  mealsChanged = new Subject<Meal[]>();
  meals: Meal[] = [];
  private mealSubs: Subscription[] = [];

  mptCol: AngularFirestoreCollection<Mpt>;
  foodCol: AngularFirestoreCollection<Food>;
  mealCol: AngularFirestoreCollection<Meal>;
  foundMealCol: AngularFirestoreCollection<Meal>;

  mealObservable: Observable<Meal[]>;
  constructor(private db: AngularFirestore) {}
  setNextMpt(mpt: Mpt) {
    this._mptItem.next(mpt);
    console.log("next method called on " + mpt.title);
  }

  addMptToFirestore(mpt: Mpt) {
    this.db.collection("MealPlanTemplates").add(mpt);
  }
  addFoodToFirestore(food: Food) {
    this.db.collection("Food").add(food);
  }
  addMealToFirestore(meal: Meal) {
    this.db.collection("Meal").add(meal);
  }
  fetchMpts() {
    this.mptCol = this.db.collection("MealPlanTemplates");
    this.mptSubs.push(
      this.mptCol
        .snapshotChanges()
        .pipe(
          map(docArray => {
            return docArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                comment: doc.payload.doc.data().comment,
                title: doc.payload.doc.data().title
              };
            });
          })
        )
        .subscribe((mptsArray: Mpt[]) => {
          this.mpts = mptsArray;
          // console.log('Mpt: ' , this.mpts);
          this.mptsChanged.next([...this.mpts]);
        })
    );
  }
  fetchFood() {
    this.foodCol = this.db.collection("Food");
    this.foodSubs.push(
      this.foodCol
        .snapshotChanges()
        .pipe(
          map(docArray => {
            return docArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data().name,
                brandName: doc.payload.doc.data().brandName,
                protein: doc.payload.doc.data().protein,
                carbs: doc.payload.doc.data().carbs,
                fat: doc.payload.doc.data().fat,
                kcal: doc.payload.doc.data().kcal,
                quantity: doc.payload.doc.data().quantity
              };
            });
          })
        )
        .subscribe((foodArray: Food[]) => {
          this.foods = foodArray;
          // console.log('Food: ' , this.foods);
          this.foodsChanged.next([...this.foods]);
        })
    );
  }
  fetchMeal() {
    this.mealCol = this.db.collection("Meal");
    this.mealSubs.push(
      this.mealCol
        .snapshotChanges()
        .pipe(
          map(docArray => {
            return docArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data().name,
                foodArray: doc.payload.doc.data().foodArray
              };
            });
          })
        )
        .subscribe((mealsArray: Meal[]) => {
          this.meals = mealsArray;
          // console.log('Meal: ' , this.meals);
          this.mealsChanged.next([...this.meals]);
        })
    );
  }
  getMpt(mptId: string) {
    const mptDocRef = this.db.doc(`MealPlanTemplates/${mptId}`);
    return mptDocRef.valueChanges();
  }
  searchMeal(searchString: string) {
    this.foundMealCol = this.db.collection("Meal", ref => {
      return ref.where("name", "==", searchString);
    });
    this.mealObservable = this.mealCol.valueChanges();
    return this.mealObservable;
  }
  setMeal(mpt: Mpt, mealString: string, meal: Meal) {
    const mptID = mpt.id;
    const mptDoc: AngularFirestoreDocument<Mpt> = this.db.doc<Mpt>(
      "MealPlanTemplates/" + mptID
    );
    if (mealString === "Breakfast") {
      mpt.breakfastIngredients = meal;
      console.log("Breakfast is set!");
    } else if (mealString === "Lunch") {
      mpt.lunchIngredients = meal;
      console.log("Lunch is set!");
    } else if (mealString === "Dinner") {
      mpt.dinnerIngredients = meal;
      console.log("Dinner is set!");
    } else if (mealString === "Snacks") {
      mpt.snacksIngredients = meal;
      console.log("Snack is set!");
    } else {
      console.log("Cant update item. Item not found!");
    }
    if (mealString === "Breakfast") {
      mpt.breakfastIngredients.foodArray.forEach(e => {
        mpt.totalKcal += +e.kcal;
        mpt.totalProtein += +e.protein;
        mpt.totalCarbs += +e.carbs;
        mpt.totalFat += +e.fat;
      });
    }
    if (mealString === "Lunch") {
      mpt.lunchIngredients.foodArray.forEach(e => {
        mpt.totalKcal += +e.kcal;
        mpt.totalProtein += +e.protein;
        mpt.totalCarbs += +e.carbs;
        mpt.totalFat += +e.fat;
      });
    }
    if (mealString === "Dinner") {
      mpt.dinnerIngredients.foodArray.forEach(e => {
        mpt.totalKcal += +e.kcal;
        mpt.totalProtein += +e.protein;
        mpt.totalCarbs += +e.carbs;
        mpt.totalFat += +e.fat;
      });
    }
    if (mealString === "Snacks") {
      mpt.snacksIngredients.foodArray.forEach(e => {
        mpt.totalKcal += +e.kcal;
        mpt.totalProtein += +e.protein;
        mpt.totalCarbs += +e.carbs;
        mpt.totalFat += +e.fat;
      });
    }
    // mpt.totalKcal = Math.round(mpt.totalKcal);
    // mpt.totalProtein = Math.round(mpt.totalProtein);
    // mpt.totalCarbs = Math.round(mpt.totalCarbs);
    // mpt.totalFat = Math.round(mpt.totalFat);
    mptDoc.update(mpt);
    console.log(mpt.title + " just got updated!");
  }
  // setNextFood(food: Food, newQ: number) {
  //   food.protein = food.protein / food.quantity * newQ;
  //   food.carbs = food.carbs / food.quantity * newQ;
  //   food.fat = food.fat / food.quantity * newQ;
  //   food.kcal = food.kcal / food.quantity * newQ;
  //   food.quantity = newQ;
  //   this._foodItem.next(food);
  // }
  updateMpt(mpt: Mpt, food: Food, newFoodQ: number) {
    console.log("Current food Q: ", food.quantity);
    const oldprotein = food.protein;
    const oldkcal = food.kcal;
    const oldfat = food.fat;
    const oldcarbs = food.carbs;
    food.protein = (food.protein / food.quantity) * newFoodQ;
    food.carbs = (food.carbs / food.quantity) * newFoodQ;
    food.fat = (food.fat / food.quantity) * newFoodQ;
    food.kcal = (food.kcal / food.quantity) * newFoodQ;
    if (food.quantity < newFoodQ) {
      // if (mpt.breakfastIngredients.foodArray.includes(food)) {
      //   mpt.breakfastIngredients.foodArray.forEach(e => {
      //     mpt.totalKcal += +e.kcal;
      //     mpt.totalProtein += +e.protein;
      //     mpt.totalCarbs += +e.carbs;
      //     mpt.totalFat += +e.fat;
      //   });
      // }
      // if (mpt.lunchIngredients.foodArray.includes(food)) {
      //   mpt.lunchIngredients.foodArray.forEach(e => {
      //     console.log('Changeing macros from lunch');
      //     mpt.totalKcal += +e.kcal;
      //     mpt.totalProtein += +e.protein;
      //     mpt.totalCarbs += +e.carbs;
      //     mpt.totalFat += +e.fat;
      //   });
      // }
      // if (mpt.dinnerIngredients.foodArray.includes(food)) {
      //   mpt.dinnerIngredients.foodArray.forEach(e => {
      //     mpt.totalKcal += +e.kcal;
      //     mpt.totalProtein += +e.protein;
      //     mpt.totalCarbs += +e.carbs;
      //     mpt.totalFat += +e.fat;
      //   });
      // }
      if (mpt.snacksIngredients.foodArray.includes(food)) {
        mpt.snacksIngredients.foodArray.forEach(e => {
          mpt.totalKcal += oldkcal - e.kcal;
          mpt.totalProtein += oldprotein - e.protein;
          mpt.totalCarbs += oldcarbs - e.carbs;
          mpt.totalFat += oldfat - e.fat;
        });
      }
    } else {
      // if (mpt.breakfastIngredients.foodArray.includes(food)) {
      //   mpt.breakfastIngredients.foodArray.forEach(e => {
      //     mpt.totalKcal -= +e.kcal;
      //     mpt.totalProtein -= +e.protein;
      //     mpt.totalCarbs -= +e.carbs;
      //     mpt.totalFat -= +e.fat;
      //   });
      // }
      // if (mpt.lunchIngredients.foodArray.includes(food)) {
      //   mpt.lunchIngredients.foodArray.forEach(e => {
      //     console.log('Changeing macros from lunch');
      //     mpt.totalKcal -= +e.kcal;
      //     mpt.totalProtein -= +e.protein;
      //     mpt.totalCarbs -= +e.carbs;
      //     mpt.totalFat -= +e.fat;
      //   });
      // }
      // if (mpt.dinnerIngredients.foodArray.includes(food)) {
      //   mpt.dinnerIngredients.foodArray.forEach(e => {
      //     mpt.totalKcal -= +e.kcal;
      //     mpt.totalProtein -= +e.protein;
      //     mpt.totalCarbs -= +e.carbs;
      //     mpt.totalFat -= +e.fat;
      //   });
      // }
      if (mpt.snacksIngredients.foodArray.includes(food)) {
        mpt.snacksIngredients.foodArray.forEach(e => {
          mpt.totalKcal -= +(oldkcal - e.kcal);
          mpt.totalProtein -= +(oldprotein - e.protein);
          mpt.totalCarbs -= +(oldcarbs - e.carbs);
          mpt.totalFat -= +(oldfat - e.fat);
        });
      }
    }
    food.quantity = newFoodQ;
    this._foodItem.next(food);
    this.db
      .collection("MealPlanTemplates/")
      .doc(mpt.id)
      .update(mpt);
    console.log(mpt.title + " just got updated!");
  }
}
