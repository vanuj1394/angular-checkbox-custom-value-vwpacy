import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  checkboxGroup: FormGroup;
  submittedValue: any;
  subscription: Subscription;
  checkboxesList = [
    {
      name: 'Value 1',
      value: 'value-1',
    },
    {
      name: 'Value 2',
      value: 'value-2',
    },
    {
      name: 'Value 3',
      value: 'value-3',
    },
  ];
  // In case the checkboxes have default values
  // defaultValues = ['value-1', 'value-3'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.checkboxGroup = this.fb.group({
      checkboxes: this.fb.array(this.checkboxesList.map((x) => 0)),
      // Form Array to set default values
      // checkboxes: this.fb.array(this.checkboxes.map(x => this.defaultValues.includes(x.value) ? x.value : null))
    });

    const checkboxControl = this.checkboxGroup.controls.checkboxes as FormArray;
    this.subscription = checkboxControl.valueChanges.subscribe((checkbox) => {
      console.log(checkbox)
      checkboxControl.setValue(
        checkboxControl.value.map((value, i) => (value ? 1 : 0)),
        { emitEvent: false }
      );
    });
  }

  submit() {
    const checkboxControl = this.checkboxGroup.controls.checkboxes as FormArray;
    const formValue = {
      ...this.checkboxGroup.value,
      checkboxes: checkboxControl.value.filter((value) => !!value),
    };
    this.submittedValue = formValue;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  increment(controls: any) {
    console.log(controls);
  }
}
