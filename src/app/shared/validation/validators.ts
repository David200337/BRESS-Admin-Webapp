import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const date = new Date(control.value);
    if (!date) {
      return null;
    }
    date.setDate(date.getDate() + 1);
    return date <= new Date() ? { futureDate: true } : null;
  };
}
