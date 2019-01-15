import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MptService } from '../../mpt.service';

@Component({
  selector: 'app-create-meal-dialog',
  templateUrl: './create-meal-dialog.component.html',
  styleUrls: ['./create-meal-dialog.component.css']
})
export class CreateMealDialogComponent implements OnInit {
  mealForm: FormGroup;
  constructor(private fb: FormBuilder, private ms: MptService) { }
  ngOnInit() {
    this.mealForm = this.fb.group({
      name: ['', Validators.required],
      food: this.fb.array([])
    });
  }
  get foodForms() {
    return this.mealForm.get('food') as FormArray;
  }
  addIngredients() {
    const food = this.fb.group({
      name: [],
      protein: [],
      carbs: [],
      fat: [],
      kcal: []
    });
    this.foodForms.push(food);
  }
  deleteFood(i) {
    this.foodForms.removeAt(i);
  }

  async submitForm() {

    const formValue = this.mealForm.value;

    try {
      await this.ms.addMealToFirestore(formValue);
    } catch (err) {
      console.error(err);
    }
  }

}
