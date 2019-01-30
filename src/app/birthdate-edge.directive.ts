import {FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export const birthdateEdgeValidator: ValidatorFn = (control: FormControl): ValidationErrors | null => {
  if (control.valid) {
    const birthdate: Date = new Date(control.value);
    const tenYearsAgo: Date = new Date();
    tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);

    return birthdate.getTime() > tenYearsAgo.getTime() ? {'birthdateEdge': true} : null;
  }
  // return firstName && lastName && firstName.value === lastName.value ? { 'identityRevealed': true } : null;
};
