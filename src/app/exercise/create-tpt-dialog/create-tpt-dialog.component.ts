import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TptService } from '../tpt.service';

@Component({
  selector: 'app-create-tpt-dialog',
  templateUrl: './create-tpt-dialog.component.html',
  styleUrls: ['./create-tpt-dialog.component.css']
})
export class CreateTptDialogComponent implements OnInit {
  tptForm: FormGroup;
  constructor(private fb: FormBuilder, private ms: TptService) { }

  ngOnInit() {
    this.tptForm = this.fb.group({
      title: ['', Validators.required],
      comment: ['', Validators.required]
    });
  }
  async submitForm() {
    const formValue = this.tptForm.value;

    try {
      await this.ms.addTptToFirestore(formValue);
    } catch (err) {
      console.error(err);
    }
  }

}
