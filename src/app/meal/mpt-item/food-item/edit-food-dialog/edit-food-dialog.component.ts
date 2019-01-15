import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MptService } from 'src/app/meal/mpt.service';

@Component({
  selector: 'app-edit-food-dialog',
  templateUrl: './edit-food-dialog.component.html',
  styleUrls: ['./edit-food-dialog.component.css']
})
export class EditFoodDialogComponent implements OnInit {
  editFoodForm: FormGroup;
  constructor(private fb: FormBuilder, private ms: MptService) { }

  ngOnInit() {
    this.editFoodForm = this.fb.group({
      quantity: ['', [
        Validators.min(1),
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ]]
    });
  }
  async submitForm() {
    const formValue = this.editFoodForm.value.quantity;

    // try {
    //   await this.ms.setNextFood(formValue);
    // } catch (err) {
    //   console.error(err);
    // }
  }

}
