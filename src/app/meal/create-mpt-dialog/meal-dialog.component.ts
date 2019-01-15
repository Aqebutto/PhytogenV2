import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MptService } from '../mpt.service';

@Component({
  selector: 'app-meal-dialog',
  templateUrl: './meal-dialog.component.html',
  styleUrls: ['./meal-dialog.component.css']
})
export class MealDialogComponent implements OnInit {
  mptForm: FormGroup;
  constructor(private fb: FormBuilder, private ms: MptService) { }

  ngOnInit() {
    this.mptForm = this.fb.group({
      title: ['', Validators.required],
      comment: ['', Validators.required],
      totalKcal: [0],
      totalProtein: [0],
      totalCarbs: [0],
      totalFat: [0]

    });
  }
  async submitForm() {
    const formValue = this.mptForm.value;

    try {
      await this.ms.addMptToFirestore(formValue);
    } catch (err) {
      console.error(err);
    }
  }

}
