import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MptService } from '../../mpt.service';

@Component({
  selector: 'app-create-food-dialog',
  templateUrl: './create-food-dialog.component.html',
  styleUrls: ['./create-food-dialog.component.css']
})
export class CreateFoodDialogComponent implements OnInit {
  foodForm: FormGroup;
  constructor(private fb: FormBuilder, private ms: MptService) { }

  ngOnInit() {
    this.foodForm = this.fb.group({
      name: ['', Validators.required],
      brandName: ['', Validators.required],
      protein: ['', Validators.required],
      carbs: ['', Validators.required],
      fat: ['', Validators.required],
      kcal: ['', Validators.required],
      quantity: [100]
    });
  }
  async submitForm() {
    const formValue = this.foodForm.value;

    try {
      await this.ms.addFoodToFirestore(formValue);
    } catch (err) {
      console.error(err);
    }
  }

}
